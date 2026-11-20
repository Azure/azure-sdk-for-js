// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudResourcesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
