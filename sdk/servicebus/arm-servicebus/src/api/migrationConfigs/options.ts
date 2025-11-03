// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MigrationConfigsRevertOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationConfigsCompleteMigrationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationConfigsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationConfigsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationConfigsCreateAndStartMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationConfigsGetOptionalParams extends OperationOptions {}
