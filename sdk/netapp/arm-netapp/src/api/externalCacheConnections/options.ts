// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExternalCacheConnectionsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExternalCacheConnectionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExternalCacheConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExternalCacheConnectionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExternalCacheConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExternalCacheConnectionsGetOptionalParams extends OperationOptions {}
