// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlServerDatabasesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerDatabasesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerDatabasesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerDatabasesCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerDatabasesGetOptionalParams extends OperationOptions {}
