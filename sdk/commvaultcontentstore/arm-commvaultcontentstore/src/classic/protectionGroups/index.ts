// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import {
  backup,
  resumeBackup,
  restore,
  stopBackup,
  listByCloudAccount,
  $delete,
  createOrupdate,
  get,
} from "../../api/protectionGroups/operations.js";
import type {
  ProtectionGroupsBackupOptionalParams,
  ProtectionGroupsResumeBackupOptionalParams,
  ProtectionGroupsRestoreOptionalParams,
  ProtectionGroupsStopBackupOptionalParams,
  ProtectionGroupsListByCloudAccountOptionalParams,
  ProtectionGroupsDeleteOptionalParams,
  ProtectionGroupsCreateOrupdateOptionalParams,
  ProtectionGroupsGetOptionalParams,
} from "../../api/protectionGroups/options.js";
import type {
  ProtectionGroup,
  StopBackupProtectionGroupRequest,
  RestoreProtectionItemRequest,
  RestoreProtectionItemResponse,
  BackupProtectionGroupRequest,
  BackupProtectionGroupResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProtectionGroups operations. */
export interface ProtectionGroupsOperations {
  /** Ad-hoc backup of protected items resource in given protection group. */
  backup: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    request: BackupProtectionGroupRequest,
    options?: ProtectionGroupsBackupOptionalParams,
  ) => Promise<BackupProtectionGroupResponse>;
  /** Resume Backup for a Protection Group. */
  resumeBackup: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    options?: ProtectionGroupsResumeBackupOptionalParams,
  ) => Promise<void>;
  /** Restore resource for a protected items in given protection group. */
  restore: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    request: RestoreProtectionItemRequest,
    options?: ProtectionGroupsRestoreOptionalParams,
  ) => Promise<RestoreProtectionItemResponse>;
  /** Stop Backup for a Protection Group */
  stopBackup: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    request: StopBackupProtectionGroupRequest,
    options?: ProtectionGroupsStopBackupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List ProtectionGroup resources by CloudAccount */
  listByCloudAccount: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: ProtectionGroupsListByCloudAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionGroup>;
  /** Delete a ProtectionGroup */
  delete: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    options?: ProtectionGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ProtectionGroup */
  createOrupdate: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    resource: ProtectionGroup,
    options?: ProtectionGroupsCreateOrupdateOptionalParams,
  ) => PollerLike<OperationState<ProtectionGroup>, ProtectionGroup>;
  /** Get a ProtectionGroup */
  get: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    options?: ProtectionGroupsGetOptionalParams,
  ) => Promise<ProtectionGroup>;
}

function _getProtectionGroups(context: ContentStoreContext) {
  return {
    backup: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      request: BackupProtectionGroupRequest,
      options?: ProtectionGroupsBackupOptionalParams,
    ) =>
      backup(context, resourceGroupName, cloudAccountName, protectionGroupName, request, options),
    resumeBackup: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      options?: ProtectionGroupsResumeBackupOptionalParams,
    ) => resumeBackup(context, resourceGroupName, cloudAccountName, protectionGroupName, options),
    restore: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      request: RestoreProtectionItemRequest,
      options?: ProtectionGroupsRestoreOptionalParams,
    ) =>
      restore(context, resourceGroupName, cloudAccountName, protectionGroupName, request, options),
    stopBackup: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      request: StopBackupProtectionGroupRequest,
      options?: ProtectionGroupsStopBackupOptionalParams,
    ) =>
      stopBackup(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        request,
        options,
      ),
    listByCloudAccount: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: ProtectionGroupsListByCloudAccountOptionalParams,
    ) => listByCloudAccount(context, resourceGroupName, cloudAccountName, options),
    delete: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      options?: ProtectionGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudAccountName, protectionGroupName, options),
    createOrupdate: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      resource: ProtectionGroup,
      options?: ProtectionGroupsCreateOrupdateOptionalParams,
    ) =>
      createOrupdate(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      options?: ProtectionGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudAccountName, protectionGroupName, options),
  };
}

export function _getProtectionGroupsOperations(
  context: ContentStoreContext,
): ProtectionGroupsOperations {
  return {
    ..._getProtectionGroups(context),
  };
}
