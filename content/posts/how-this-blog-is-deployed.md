---
title: 'How This Blog is Deployed: A Simple CI/CD Pipeline'
date: '2025-01-15'
excerpt: 'A deep dive into the automated deployment pipeline that powers this blog, from GitHub Actions to AWS S3 static hosting.'
authors: ['Marcus']
tags: ['DevOps', 'CI/CD', 'AWS', 'GitHub Actions', 'Next.js']
---

This blog runs on a fully automated deployment pipeline that exemplifies modern DevOps practices. Every time code is merged to the main branch, it automatically builds and deploys to production within minutes. Here's how it works.

## Architecture Overview

The deployment architecture consists of three main components:

-   **Next.js Static Site Generation**: The blog is built as a static site using Next.js with static export
-   **GitHub Actions CI/CD**: Automated testing, building, and deployment pipeline
-   **AWS S3 Static Hosting**: Production hosting with Cloudflare CDN distribution

## The CI/CD Pipeline

### Continuous Integration

Every push and pull request triggers our CI pipeline defined in `.github/workflows/ci.yml`:

```yaml
name: CI

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    lint-test-build:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout repository
              uses: actions/checkout@v4

            - name: Use Node.js 20.x
              uses: actions/setup-node@v4
              with:
                  node-version: 20.x
                  cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Run lint
              run: npm run lint

            - name: Run tests
              run: npm test

            - name: Build project
              run: npm run build
```

This ensures every change is:

-   Linted for code quality
-   Tested for functionality
-   Verified to build successfully

### Continuous Deployment

When a pull request is merged to main, the deployment pipeline kicks in via `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3
on:
    pull_request:
        types: [closed]
        branches: [main]

permissions:
    id-token: write
    contents: read

jobs:
    deploy:
        if: github.event.pull_request.merged == true
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                  node-version: 18
                  cache: 'npm'

            - run: npm ci
            - run: npm run build

            - name: Configure AWS credentials
              uses: aws-actions/configure-aws-credentials@v4
              with:
                  role-to-assume: ${{ vars.AWS_ROLE_ARN }}
                  aws-region: us-east-1

            - name: Deploy to S3
              run: aws s3 sync out/ s3://blog.calisera.io --delete
```

## Security: OIDC Authentication

Instead of storing AWS access keys as secrets, we use OpenID Connect (OIDC) for secure, keyless authentication. This is configured in our Terraform infrastructure:

```hcl
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
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
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
        }
        StringLike = {
          "token.actions.githubusercontent.com:sub" = "repo:calisera-io/calisera-project-blog:*"
        }
      }
    }]
  })
}
```

This approach provides:

-   **No long-lived credentials** to manage or rotate
-   **Automatic token expiration** after each workflow run
-   **Repository-specific access** that can't be used elsewhere
-   **Audit trail** of all authentication events

## IAM Permissions

The GitHub Actions role needs specific S3 permissions to deploy the site:

```hcl
resource "aws_iam_role_policy" "github_actions_s3" {
  name = "github-actions-s3-policy"
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
        "arn:aws:s3:::blog.calisera.io",
        "arn:aws:s3:::blog.calisera.io/*"
      ]
    }]
  })
}
```

## Static Site Generation

The blog uses Next.js configured for static export in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
};
```

This configuration:

-   Generates static HTML files for all pages
-   Adds trailing slashes for consistent URLs
-   Disables image optimization for static hosting compatibility

The build process creates an `out/` directory containing the complete static site, which is then synced to S3.

## Infrastructure as Code

All AWS resources are managed through Terraform, ensuring:

-   **Reproducible infrastructure** across environments
-   **Version-controlled changes** to cloud resources
-   **Automated provisioning** and updates

The infrastructure includes:

-   S3 bucket for static hosting
-   IAM roles and policies for GitHub Actions
-   OIDC provider configuration

## Deployment Flow

Here's what happens when you merge a pull request:

1. **Trigger**: PR merge to main branch activates deployment workflow
2. **Checkout**: GitHub Actions pulls the latest code
3. **Setup**: Node.js environment is configured with dependency caching
4. **Install**: Dependencies are installed with `npm ci` for reproducible builds
5. **Build**: Next.js generates the static site in the `out/` directory
6. **Authenticate**: OIDC token exchange provides temporary AWS credentials
7. **Deploy**: `aws s3 sync` uploads the site with `--delete` flag to remove old files
8. **Live**: Changes are immediately available at the production URL

## Benefits of This Approach

**Developer Experience**:

-   Zero-friction deployments
-   Immediate feedback on build failures
-   Consistent environments across team members

**Security**:

-   No stored credentials
-   Principle of least privilege
-   Audit trail for all deployments

**Reliability**:

-   Automated testing prevents broken deployments
-   Infrastructure as code ensures consistency
-   Static hosting provides excellent uptime

**Performance**:

-   Static files serve incredibly fast
-   CDN distribution for global performance
-   Minimal server-side complexity

## Monitoring and Observability

While this setup is largely self-managing, we monitor:

-   **GitHub Actions workflow success/failure rates**
-   **Build times and performance trends**
-   **S3 sync operation logs**
-   **Website availability and performance**

## Future Enhancements

Potential improvements to this pipeline include:

-   **Preview deployments** for pull requests
-   **Automated performance testing** in CI
-   **Blue-green deployments** for zero-downtime updates
-   **Slack notifications** for deployment status

This deployment pipeline demonstrates how modern tools can create a robust, secure, and efficient path from code to production. The combination of GitHub Actions, AWS services, and infrastructure as code provides a foundation that scales with your project's needs.
