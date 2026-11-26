// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ActiveDirectoryConfigsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActiveDirectoryConfigsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActiveDirectoryConfigsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActiveDirectoryConfigsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActiveDirectoryConfigsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActiveDirectoryConfigsGetOptionalParams extends OperationOptions {}
