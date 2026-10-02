// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MaintenanceWindowsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenanceWindowsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenanceWindowsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MaintenanceWindowsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenanceWindowsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MaintenanceWindowsGetOptionalParams extends OperationOptions {}
