// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DevCentersListBySubscriptionOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface DevCentersListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface DevCentersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevCentersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevCentersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevCentersGetOptionalParams extends OperationOptions {}
