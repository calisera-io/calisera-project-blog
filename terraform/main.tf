data "archive_file" "webhook_handler_zip" {
  type        = "zip"
  output_path = "${path.module}/lambda/github-webhook-handler.zip"
  source {
    content  = file("${path.module}/lambda/github-webhook-handler.py")
    filename = "github_webhook_handler.py"
  }
}

resource "aws_iam_role" "webhook_handler" {
  name = "webhook-handler-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = [
            "lambda.amazonaws.com",
            "ssm.amazonaws.com",
            "codebuild.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "webhook_handler" {
  role       = aws_iam_role.webhook_handler.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "webhook_handler_ssm" {
  role       = aws_iam_role.webhook_handler.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "webhook_handler_codebuild" {
  role       = aws_iam_role.webhook_handler.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess"
}

resource "aws_lambda_function" "webhook_handler" {
  filename         = data.archive_file.webhook_handler_zip.output_path
  source_code_hash = data.archive_file.webhook_handler_zip.output_base64sha256
  function_name    = "github-webhook-handler"
  runtime          = "python3.12"
  handler          = "github_webhook_handler.lambda_handler"
  role             = aws_iam_role.webhook_handler.arn
  timeout          = 30
}

resource "aws_api_gateway_rest_api" "webhook_api" {
  name = "webhook-api"
}

resource "aws_api_gateway_resource" "webhook_resource" {
  rest_api_id = aws_api_gateway_rest_api.webhook_api.id
  parent_id   = aws_api_gateway_rest_api.webhook_api.root_resource_id
  path_part   = "webhook"
}

resource "aws_api_gateway_method" "webhook_method" {
  rest_api_id   = aws_api_gateway_rest_api.webhook_api.id
  resource_id   = aws_api_gateway_resource.webhook_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.webhook_api.id
  resource_id = aws_api_gateway_resource.webhook_resource.id
  http_method = aws_api_gateway_method.webhook_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.webhook_handler.invoke_arn
}

resource "aws_api_gateway_deployment" "webhook_deployment" {
  depends_on  = [aws_api_gateway_integration.lambda_integration]
  rest_api_id = aws_api_gateway_rest_api.webhook_api.id
}

resource "aws_api_gateway_stage" "webhook_stage" {
  deployment_id = aws_api_gateway_deployment.webhook_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.webhook_api.id
  stage_name    = "dev"
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.webhook_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.webhook_api.execution_arn}/*/*"
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild-nextjs-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "codebuild.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "codebuild_policy" {
  role = aws_iam_role.codebuild_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          data.aws_s3_bucket.static_site.arn,
          "${data.aws_s3_bucket.static_site.arn}/*"
        ]
      }
    ]
  })
}

data "aws_s3_bucket" "static_site" {
  bucket = "blog.calisera.io"
}

resource "aws_codebuild_project" "nextjs_build" {
  name         = "nextjs-build-deploy"
  service_role = aws_iam_role.codebuild_role.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  logs_config {
    cloudwatch_logs {
      status     = "ENABLED"
      group_name = "/aws/codebuild/nextjs-build-deploy"
    }
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/amazonlinux2-x86_64-standard:5.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "S3_BUCKET"
      value = data.aws_s3_bucket.static_site.bucket
    }
  }

  source {
    type     = "GITHUB"
    location = "https://github.com/hogh/calisera-project-blog.git"
    buildspec = yamlencode({
      version = "0.2"
      phases = {
        install = {
          runtime-versions = {
            nodejs = 18
          }
        }
        pre_build = {
          commands = ["npm ci"]
        }
        build = {
          commands = ["npm run build"]
        }
        post_build = {
          commands = ["aws s3 sync out/ s3://$S3_BUCKET --delete"]
        }
      }
    })
  }
}