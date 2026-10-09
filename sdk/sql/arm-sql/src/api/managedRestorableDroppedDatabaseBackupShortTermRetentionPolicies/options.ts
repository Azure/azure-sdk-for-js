// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOptionalParams extends OperationOptions {}
