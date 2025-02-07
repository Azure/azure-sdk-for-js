// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RoleDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use atScopeAndBelow filter to search below the given scope as well. */
  $filter?: string;
}

/** Optional parameters. */
export interface RoleDefinitionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsCreateOrUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsListForScopeOptionalParams
  extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  $filter?: string;
}

/** Optional parameters. */
export interface RoleAssignmentsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SelectiveKeyRestoreOperationOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SelectiveKeyRestoreStatusOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FullRestoreOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PreFullRestoreOperationOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RestoreStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PreFullBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FullBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FullBackupStatusOptionalParams extends OperationOptions {}
