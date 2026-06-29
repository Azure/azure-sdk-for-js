// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IpAllocationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpAllocationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpAllocationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpAllocationsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpAllocationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpAllocationsGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
