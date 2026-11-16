// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import {
  listInstantItemRecoveryOperationResult,
  revoke,
  provision,
} from "../../api/itemLevelRecoveryConnections/operations.js";
import type {
  ItemLevelRecoveryConnectionsListInstantItemRecoveryOperationResultOptionalParams,
  ItemLevelRecoveryConnectionsRevokeOptionalParams,
  ItemLevelRecoveryConnectionsProvisionOptionalParams,
} from "../../api/itemLevelRecoveryConnections/options.js";
import type {
  InstantItemRecoveryTarget,
  ILRRequestResource,
  InstantItemRecoveryOperationResultRequest,
} from "../../models/models.js";

/** Interface representing a ItemLevelRecoveryConnections operations. */
export interface ItemLevelRecoveryConnectionsOperations {
  /** Fetches the mount scripts (iSCSI connection details) for an active Instant Item Recovery (ILR) session on the recovery point. Required from API version 2026-08-01 onwards; replaces the scripts previously returned inline in the operationsStatus (ILR provision) response. */
  listInstantItemRecoveryOperationResult: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    body: InstantItemRecoveryOperationResultRequest,
    options?: ItemLevelRecoveryConnectionsListInstantItemRecoveryOperationResultOptionalParams,
  ) => Promise<InstantItemRecoveryTarget>;
  /**
   * Revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
   * displaying all recoverable files and folders. This is an asynchronous operation.
   */
  revoke: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    options?: ItemLevelRecoveryConnectionsRevokeOptionalParams,
  ) => Promise<void>;
  /**
   * Provisions a script which invokes an iSCSI connection to the backup data. Executing this script opens a file
   * explorer displaying all the recoverable files and folders. This is an asynchronous operation. To know the status of
   * provisioning, call GetProtectedItemOperationResult API.
   */
  provision: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    parameters: ILRRequestResource,
    options?: ItemLevelRecoveryConnectionsProvisionOptionalParams,
  ) => Promise<void>;
}

function _getItemLevelRecoveryConnections(context: RecoveryServicesBackupContext) {
  return {
    listInstantItemRecoveryOperationResult: (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      body: InstantItemRecoveryOperationResultRequest,
      options?: ItemLevelRecoveryConnectionsListInstantItemRecoveryOperationResultOptionalParams,
    ) =>
      listInstantItemRecoveryOperationResult(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        body,
        options,
      ),
    revoke: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      options?: ItemLevelRecoveryConnectionsRevokeOptionalParams,
    ) =>
      revoke(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        options,
      ),
    provision: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      parameters: ILRRequestResource,
      options?: ItemLevelRecoveryConnectionsProvisionOptionalParams,
    ) =>
      provision(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        parameters,
        options,
      ),
  };
}

export function _getItemLevelRecoveryConnectionsOperations(
  context: RecoveryServicesBackupContext,
): ItemLevelRecoveryConnectionsOperations {
  return {
    ..._getItemLevelRecoveryConnections(context),
  };
}
