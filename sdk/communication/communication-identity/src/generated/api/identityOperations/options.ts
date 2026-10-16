// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationIdentityCreateRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IdentityOperationsIssueAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityOperationsRevokeAccessTokensOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityOperationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityOperationsCreateOptionalParams extends OperationOptions {
  /** If specified, creates also a Communication Identity access token associated with the identity and containing the requested scopes. */
  body?: CommunicationIdentityCreateRequest;
}
