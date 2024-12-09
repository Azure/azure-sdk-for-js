// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";
import {
  SASTokenParameter,
  PreBackupOperationParameters,
  PreRestoreOperationParameters,
  RestoreOperationParameters,
  SelectiveKeyRestoreOperationParameters,
} from "../models/models.js";

/** Optional parameters. */
export interface FullBackupStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FullBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Azure blob shared access signature token pointing to a valid Azure blob container where full backup needs to be stored. This token needs to be valid for at least next 24 hours from the time of making this call. */
  azureStorageBlobContainerUri?: SASTokenParameter;
}

/** Optional parameters. */
export interface PreFullBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameters to validate prior to performing a full backup operation. */
  preBackupOperationParameters?: PreBackupOperationParameters;
}

/** Optional parameters. */
export interface RestoreStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PreFullRestoreOperationOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional pre restore parameters to validate prior to performing a full restore operation. */
  preRestoreOperationParameters?: PreRestoreOperationParameters;
}

/** Optional parameters. */
export interface FullRestoreOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Azure blob SAS token pointing to a folder where the previous successful full backup was stored. */
  restoreBlobDetails?: RestoreOperationParameters;
}

/** Optional parameters. */
export interface SelectiveKeyRestoreOperationOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Azure blob SAS token pointing to a folder where the previous successful full backup was stored */
  restoreBlobDetails?: SelectiveKeyRestoreOperationParameters;
}

/** Optional parameters. */
export interface UpdateSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleAssignmentsListForScopeOptionalParams
  extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignments at or above the scope. Use $filter=principalId eq {id} to return all role assignments at, above or below the scope for the specified principal. */
  $filter?: string;
}

/** Optional parameters. */
export interface RoleDefinitionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsCreateOrUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use atScopeAndBelow filter to search below the given scope as well. */
  $filter?: string;
}
