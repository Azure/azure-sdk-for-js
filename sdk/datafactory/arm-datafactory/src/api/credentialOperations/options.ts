// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CredentialOperationsListByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CredentialOperationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CredentialOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the credential entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface CredentialOperationsGetOptionalParams extends OperationOptions {
  /** ETag of the credential entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
