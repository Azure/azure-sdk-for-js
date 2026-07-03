// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlManagedInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlManagedInstancesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlManagedInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlManagedInstancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlManagedInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlManagedInstancesGetOptionalParams extends OperationOptions {}
