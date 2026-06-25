// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseMigrationsSqlMiCutoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseMigrationsSqlMiCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseMigrationsSqlMiDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional force delete boolean. If this is provided as true, migration will be deleted even if active. */
  force?: boolean;
}

/** Optional parameters. */
export interface DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseMigrationsSqlMiGetOptionalParams extends OperationOptions {
  /** Optional migration operation ID. If this is provided, then details of migration operation for that ID are retrieved. If not provided (default), then details related to most recent or current operation are retrieved. */
  migrationOperationId?: string;
  /** Complete migration details be included in the response. */
  expand?: string;
}
