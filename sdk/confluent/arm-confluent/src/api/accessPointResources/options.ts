// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessPointResourcesListOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AccessPointResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface AccessPointResourcesCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface AccessPointResourcesGetOptionalParams extends OperationOptions {}
