// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudsGetOptionalParams extends OperationOptions {}
