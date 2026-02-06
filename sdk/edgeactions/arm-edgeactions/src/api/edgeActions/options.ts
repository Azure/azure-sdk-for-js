// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EdgeActionsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EdgeActionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EdgeActionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeActionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeActionsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeActionsGetOptionalParams extends OperationOptions {}
