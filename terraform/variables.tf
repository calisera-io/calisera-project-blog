variable "shared_config_file" {
  type        = string
  description = "AWS config file path"
  default     = "~/.aws/config"
}

variable "shared_credentials_file" {
  type        = string
  description = "AWS credentials file path"
  default     = "~/.aws/credentials"
}

variable "profile" {
  type        = string
  description = "AWS profile"
  default     = "default"
}

variable "region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "author" {
  type        = string
  description = "Created by"
  default     = "Marcus Hogh"
}