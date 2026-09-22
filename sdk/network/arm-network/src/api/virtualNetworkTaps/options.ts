// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkTapsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkTapsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkTapsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkTapsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkTapsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkTapsGetOptionalParams extends OperationOptions {}
