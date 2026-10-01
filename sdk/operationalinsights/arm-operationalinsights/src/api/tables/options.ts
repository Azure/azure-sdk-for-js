// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TablesCancelSearchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TablesMigrateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TablesListByWorkspaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TablesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TablesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TablesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TablesGetOptionalParams extends OperationOptions {}
