// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JoinRequestsDenyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JoinRequestsApproveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JoinRequestsListOptionalParams extends OperationOptions {
  /** Include denied */
  includeDenied?: boolean;
}

/** Optional parameters. */
export interface JoinRequestsGetOptionalParams extends OperationOptions {}
