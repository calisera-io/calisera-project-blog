resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = ["7560D6F40FA55195F740EE2B1B7C0B4836CBE103"]
}

resource "aws_iam_role" "github_actions" {
  name = "github-actions-deploy-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Action = "sts:AssumeRole"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:calisera-io/calisera-project-blog:ref:refs/heads/main"
        }
      }
    }]
  })
}

data "aws_s3_bucket" "static_site" {
  bucket = "blog.calisera.io"
}

resource "aws_iam_role_policy" "github_actions_s3" {
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
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
    }]
  })
}
