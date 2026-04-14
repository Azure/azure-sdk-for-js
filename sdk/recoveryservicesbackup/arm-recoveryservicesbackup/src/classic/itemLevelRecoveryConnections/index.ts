// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { revoke, provision } from "../../api/itemLevelRecoveryConnections/operations.js";
import type {
  ItemLevelRecoveryConnectionsRevokeOptionalParams,
  ItemLevelRecoveryConnectionsProvisionOptionalParams,
} from "../../api/itemLevelRecoveryConnections/options.js";
import type { ILRRequestResource } from "../../models/models.js";

/** Interface representing a ItemLevelRecoveryConnections operations. */
export interface ItemLevelRecoveryConnectionsOperations {
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
