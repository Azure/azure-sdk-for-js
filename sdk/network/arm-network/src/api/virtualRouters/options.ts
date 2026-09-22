// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualRoutersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualRoutersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualRoutersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualRoutersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualRoutersGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
