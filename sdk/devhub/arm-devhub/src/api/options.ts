// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GitHubOAuthCallRequest, AdooAuthCallRequest } from "../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetAdooAuthInfoOptionalParams extends OperationOptions {
  /** The fields required in ADO OAuth call request. */
  parameters?: AdooAuthCallRequest;
}

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
