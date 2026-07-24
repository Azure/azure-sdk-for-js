// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PostgresInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PostgresInstancesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PostgresInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PostgresInstancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PostgresInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PostgresInstancesGetOptionalParams extends OperationOptions {}
