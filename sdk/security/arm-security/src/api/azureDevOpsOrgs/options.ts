// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AzureDevOpsOrgsListAvailableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureDevOpsOrgsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureDevOpsOrgsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureDevOpsOrgsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureDevOpsOrgsGetOptionalParams extends OperationOptions {}
