// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedBackupShortTermRetentionPoliciesGetOptionalParams extends OperationOptions {}
