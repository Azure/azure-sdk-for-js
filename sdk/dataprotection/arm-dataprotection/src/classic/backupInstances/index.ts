// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import {
  validateCrossRegionRestore,
  triggerCrossRegionRestore,
  validateForRestore,
  syncBackupInstance,
  suspendBackups,
  stopProtection,
  resumeProtection,
  resumeBackups,
  triggerRestore,
  triggerRehydrate,
  validateForModifyBackup,
  adhocBackup,
  $delete,
  createOrUpdate,
  get,
  validateForBackup,
  list,
  getBackupInstanceOperationResult,
} from "../../api/backupInstances/operations.js";
import type {
  BackupInstancesValidateCrossRegionRestoreOptionalParams,
  BackupInstancesTriggerCrossRegionRestoreOptionalParams,
  BackupInstancesValidateForRestoreOptionalParams,
  BackupInstancesSyncBackupInstanceOptionalParams,
  BackupInstancesSuspendBackupsOptionalParams,
  BackupInstancesStopProtectionOptionalParams,
  BackupInstancesResumeProtectionOptionalParams,
  BackupInstancesResumeBackupsOptionalParams,
  BackupInstancesTriggerRestoreOptionalParams,
  BackupInstancesTriggerRehydrateOptionalParams,
  BackupInstancesValidateForModifyBackupOptionalParams,
  BackupInstancesAdhocBackupOptionalParams,
  BackupInstancesDeleteOptionalParams,
  BackupInstancesCreateOrUpdateOptionalParams,
  BackupInstancesGetOptionalParams,
  BackupInstancesValidateForBackupOptionalParams,
  BackupInstancesListOptionalParams,
  BackupInstancesGetBackupInstanceOperationResultOptionalParams,
} from "../../api/backupInstances/options.js";
import type {
  BackupInstanceResource,
  ValidateForBackupRequest,
  OperationJobExtendedInfo,
  TriggerBackupRequest,
  ValidateForModifyBackupRequest,
  AzureBackupRehydrationRequest,
  AzureBackupRestoreRequestUnion,
  SyncBackupInstanceRequest,
  ValidateRestoreRequestObject,
  CrossRegionRestoreRequestObject,
  ValidateCrossRegionRestoreRequestObject,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupInstances operations. */
export interface BackupInstancesOperations {
  /** Validates whether Cross Region Restore can be triggered for DataSource. */
  validateCrossRegionRestore: (
    resourceGroupName: string,
    location: string,
    parameters: ValidateCrossRegionRestoreRequestObject,
    options?: BackupInstancesValidateCrossRegionRestoreOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
  /** Triggers Cross Region Restore for BackupInstance. */
  triggerCrossRegionRestore: (
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreRequestObject,
    options?: BackupInstancesTriggerCrossRegionRestoreOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
  /** Validates if Restore can be triggered for a DataSource */
  validateForRestore: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: ValidateRestoreRequestObject,
    options?: BackupInstancesValidateForRestoreOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
  /**
   * Sync backup instance again in case of failure
   * This action will retry last failed operation and will bring backup instance to valid state
   */
  syncBackupInstance: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: SyncBackupInstanceRequest,
    options?: BackupInstancesSyncBackupInstanceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This operation will stop backup for a backup instance and retains the backup data as per the policy (except latest Recovery point, which will be retained forever) */
  suspendBackups: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: BackupInstancesSuspendBackupsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This operation will stop protection of a backup instance and data will be held forever */
  stopProtection: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: BackupInstancesStopProtectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This operation will resume protection for a stopped backup instance */
  resumeProtection: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: BackupInstancesResumeProtectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This operation will resume backups for backup instance */
  resumeBackups: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: BackupInstancesResumeBackupsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Triggers restore for a BackupInstance */
  triggerRestore: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: AzureBackupRestoreRequestUnion,
    options?: BackupInstancesTriggerRestoreOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
  /** rehydrate recovery point for restore for a BackupInstance */
  triggerRehydrate: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: AzureBackupRehydrationRequest,
    options?: BackupInstancesTriggerRehydrateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Validate whether update for backup instance will be successful or not */
  validateForModifyBackup: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: ValidateForModifyBackupRequest,
    options?: BackupInstancesValidateForModifyBackupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Trigger adhoc backup */
  adhocBackup: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: TriggerBackupRequest,
    options?: BackupInstancesAdhocBackupOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
  /** Delete a backup instance in a backup vault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: BackupInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a backup instance in a backup vault */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: BackupInstanceResource,
    options?: BackupInstancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupInstanceResource>, BackupInstanceResource>;
  /** Gets a backup instance with name in a backup vault */
  get: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: BackupInstancesGetOptionalParams,
  ) => Promise<BackupInstanceResource>;
  /** Validate whether adhoc backup will be successful or not */
  validateForBackup: (
    resourceGroupName: string,
    vaultName: string,
    parameters: ValidateForBackupRequest,
    options?: BackupInstancesValidateForBackupOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
  /** Gets a backup instances belonging to a backup vault */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: BackupInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<BackupInstanceResource>;
  /** Get result of backup instance creation operation */
  getBackupInstanceOperationResult: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    operationId: string,
    options?: BackupInstancesGetBackupInstanceOperationResultOptionalParams,
  ) => Promise<BackupInstanceResource | null>;
}

function _getBackupInstances(context: DataProtectionContext) {
  return {
    validateCrossRegionRestore: (
      resourceGroupName: string,
      location: string,
      parameters: ValidateCrossRegionRestoreRequestObject,
      options?: BackupInstancesValidateCrossRegionRestoreOptionalParams,
    ) => validateCrossRegionRestore(context, resourceGroupName, location, parameters, options),
    triggerCrossRegionRestore: (
      resourceGroupName: string,
      location: string,
      parameters: CrossRegionRestoreRequestObject,
      options?: BackupInstancesTriggerCrossRegionRestoreOptionalParams,
    ) => triggerCrossRegionRestore(context, resourceGroupName, location, parameters, options),
    validateForRestore: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: ValidateRestoreRequestObject,
      options?: BackupInstancesValidateForRestoreOptionalParams,
    ) =>
      validateForRestore(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    syncBackupInstance: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: SyncBackupInstanceRequest,
      options?: BackupInstancesSyncBackupInstanceOptionalParams,
    ) =>
      syncBackupInstance(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    suspendBackups: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: BackupInstancesSuspendBackupsOptionalParams,
    ) => suspendBackups(context, resourceGroupName, vaultName, backupInstanceName, options),
    stopProtection: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: BackupInstancesStopProtectionOptionalParams,
    ) => stopProtection(context, resourceGroupName, vaultName, backupInstanceName, options),
    resumeProtection: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: BackupInstancesResumeProtectionOptionalParams,
    ) => resumeProtection(context, resourceGroupName, vaultName, backupInstanceName, options),
    resumeBackups: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: BackupInstancesResumeBackupsOptionalParams,
    ) => resumeBackups(context, resourceGroupName, vaultName, backupInstanceName, options),
    triggerRestore: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: AzureBackupRestoreRequestUnion,
      options?: BackupInstancesTriggerRestoreOptionalParams,
    ) =>
      triggerRestore(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    triggerRehydrate: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: AzureBackupRehydrationRequest,
      options?: BackupInstancesTriggerRehydrateOptionalParams,
    ) =>
      triggerRehydrate(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    validateForModifyBackup: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: ValidateForModifyBackupRequest,
      options?: BackupInstancesValidateForModifyBackupOptionalParams,
    ) =>
      validateForModifyBackup(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    adhocBackup: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: TriggerBackupRequest,
      options?: BackupInstancesAdhocBackupOptionalParams,
    ) =>
      adhocBackup(context, resourceGroupName, vaultName, backupInstanceName, parameters, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: BackupInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, backupInstanceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: BackupInstanceResource,
      options?: BackupInstancesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: BackupInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, backupInstanceName, options),
    validateForBackup: (
      resourceGroupName: string,
      vaultName: string,
      parameters: ValidateForBackupRequest,
      options?: BackupInstancesValidateForBackupOptionalParams,
    ) => validateForBackup(context, resourceGroupName, vaultName, parameters, options),
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: BackupInstancesListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    getBackupInstanceOperationResult: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      operationId: string,
      options?: BackupInstancesGetBackupInstanceOperationResultOptionalParams,
    ) =>
      getBackupInstanceOperationResult(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        operationId,
        options,
      ),
  };
}

export function _getBackupInstancesOperations(
  context: DataProtectionContext,
): BackupInstancesOperations {
  return {
    ..._getBackupInstances(context),
  };
}
