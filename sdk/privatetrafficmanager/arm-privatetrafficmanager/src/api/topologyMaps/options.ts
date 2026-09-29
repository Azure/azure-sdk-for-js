// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TopologyMapsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TopologyMapsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TopologyMapsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TopologyMapsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TopologyMapsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TopologyMapsGetOptionalParams extends OperationOptions {}
