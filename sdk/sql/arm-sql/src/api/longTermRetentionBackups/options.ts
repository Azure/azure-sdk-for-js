// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DatabaseState } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LongTermRetentionBackupsListByResourceGroupServerOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsListByResourceGroupLocationOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsListByServerOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsListByLocationOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsUpdateByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsCopyByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsDeleteByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsGetByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LongTermRetentionBackupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsCopyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsChangeAccessTierOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsListByDatabaseOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest backup for each database. */
  onlyLatestPerDatabase?: boolean;
  /** Whether to query against just live databases, just deleted databases, or all databases. */
  databaseState?: DatabaseState;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongTermRetentionBackupsGetOptionalParams extends OperationOptions {}
