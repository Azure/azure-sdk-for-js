// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkAnchorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkAnchorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkAnchorsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkAnchorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkAnchorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkAnchorsListBySubscriptionOptionalParams extends OperationOptions {}
