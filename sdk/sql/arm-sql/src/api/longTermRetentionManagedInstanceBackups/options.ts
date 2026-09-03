// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DatabaseState } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
  /** The number of elements in the collection to skip. */
  skip?: number;
  /** The number of elements to return from the collection. */
  top?: number;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
  /** The number of elements in the collection to skip. */
  skip?: number;
  /** The number of elements to return from the collection. */
  top?: number;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams extends OperationOptions {}
