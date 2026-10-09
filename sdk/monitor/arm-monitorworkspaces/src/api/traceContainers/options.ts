// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TraceContainersListByAzureMonitorWorkspaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TraceContainersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TraceContainersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TraceContainersGetOptionalParams extends OperationOptions {}
