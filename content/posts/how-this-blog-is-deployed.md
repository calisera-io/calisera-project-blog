---
title: 'How This Blog is Deployed: A Simple CI/CD Pipeline'
date: '2025-01-15'
excerpt: 'A deep dive into the automated deployment pipeline that powers this blog, from GitHub Actions to AWS S3 static hosting.'
authors: ['Marcus']
tags: ['DevOps', 'CI/CD', 'AWS', 'GitHub Actions', 'Next.js']
---

This blog runs on a fully automated deployment pipeline that exemplifies modern DevOps practices. Every time code is merged to the main branch, it automatically builds and deploys to production within minutes. Here's how it works.

## Deployment Overview

The deployment consists of three main parts:

-   **Next.js Static Site Generation**: The blog is built as a static site using Next.js with static export
-   **GitHub Actions CI/CD**: Automated testing, building, and deployment pipeline
-   **AWS S3 Static Hosting**: Production hosting with Cloudflare CDN distribution

## The CI/CD Pipeline

### Continuous Integration

Every push and pull request triggers our CI pipeline defined in `.github/workflows/ci.yml`:

!include ./public/files/github-workflows-ci.yml

This ensures every change is:

-   Linted for code quality
-   Tested for functionality
-   Verified to build successfully

### Continuous Deployment

When a pull request is merged to main, the deployment pipeline kicks in via `.github/workflows/deploy.yml`:

!include ./public/files/github-workflows-deploy.yml

## Security: OIDC Authentication

Instead of storing AWS access keys as secrets, we use OpenID Connect (OIDC) for secure, keyless authentication. We define specific S3 IAM permissions for the GitHub Actions role in a policy. This is configured in our Terraform infrastructure `terraform/main.tf`:

!include ./public/files/terraform-main.tf

This approach provides:

-   **No long-lived credentials** to manage or rotate
-   **Automatic token expiration** after each workflow run
-   **Repository-specific access** that can't be used elsewhere
-   **Audit trail** of all authentication events
-   **Specific S3 IAM permissions** for least privilege access

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
