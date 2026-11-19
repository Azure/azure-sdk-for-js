// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationMigrationItemsListOptionalParams extends OperationOptions {
  /** The pagination token. */
  skipToken?: string;
  /** The page size. */
  takeToken?: string;
  /** OData filter options. */
  filter?: string;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsTestMigrateCleanupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsTestMigrateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsResyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsResumeReplicationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsPauseReplicationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsMigrateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams extends OperationOptions {
  /** The pagination token. */
  skipToken?: string;
  /** The page size. */
  takeToken?: string;
  /** OData filter options. */
  filter?: string;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The delete option. */
  deleteOption?: string;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationMigrationItemsGetOptionalParams extends OperationOptions {}
