// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedDashboardsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDashboardsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDashboardsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDashboardsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDashboardsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedDashboardsGetOptionalParams extends OperationOptions {}
