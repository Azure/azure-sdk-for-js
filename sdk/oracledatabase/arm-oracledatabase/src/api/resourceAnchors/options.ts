// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResourceAnchorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceAnchorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceAnchorsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceAnchorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceAnchorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceAnchorsListBySubscriptionOptionalParams extends OperationOptions {}
