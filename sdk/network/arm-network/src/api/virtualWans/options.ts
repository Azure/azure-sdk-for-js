// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualWansListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualWansListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualWansDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualWansUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualWansCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualWansGetOptionalParams extends OperationOptions {}
