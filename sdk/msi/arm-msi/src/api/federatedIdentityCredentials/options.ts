// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FederatedIdentityCredentialsListOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface FederatedIdentityCredentialsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FederatedIdentityCredentialsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FederatedIdentityCredentialsGetOptionalParams extends OperationOptions {}
