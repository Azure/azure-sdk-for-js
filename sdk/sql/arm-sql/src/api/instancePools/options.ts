// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InstancePoolsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstancePoolsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstancePoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstancePoolsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstancePoolsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstancePoolsGetOptionalParams extends OperationOptions {}
