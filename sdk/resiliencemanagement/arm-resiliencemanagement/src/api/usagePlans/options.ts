// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UsagePlansListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UsagePlansListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UsagePlansDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UsagePlansUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UsagePlansCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UsagePlansGetOptionalParams extends OperationOptions {}
