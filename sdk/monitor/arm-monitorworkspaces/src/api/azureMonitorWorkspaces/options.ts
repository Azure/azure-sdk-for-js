// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AzureMonitorWorkspacesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureMonitorWorkspacesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureMonitorWorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureMonitorWorkspacesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureMonitorWorkspacesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureMonitorWorkspacesGetOptionalParams extends OperationOptions {}
