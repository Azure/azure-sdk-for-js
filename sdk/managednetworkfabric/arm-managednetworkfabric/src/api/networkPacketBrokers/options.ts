// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkPacketBrokersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkPacketBrokersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkPacketBrokersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkPacketBrokersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkPacketBrokersCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkPacketBrokersGetOptionalParams extends OperationOptions {}
