// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationsGetAzureAsyncOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationsListByClusterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationsGetOptionalParams extends OperationOptions {}
