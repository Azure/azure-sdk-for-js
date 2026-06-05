// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProtectedItemsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProtectedItemsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface ProtectedItemsGetOptionalParams extends OperationOptions {
  filter?: string;
}
