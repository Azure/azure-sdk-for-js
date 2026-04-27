// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GitHubOAuthCallRequest } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GitHubOAuthOptionalParams extends OperationOptions {
  parameters?: GitHubOAuthCallRequest;
}

/** Optional parameters. */
export interface ListGitHubOAuthOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GitHubOAuthCallbackOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GeneratePreviewArtifactsOptionalParams extends OperationOptions {}
