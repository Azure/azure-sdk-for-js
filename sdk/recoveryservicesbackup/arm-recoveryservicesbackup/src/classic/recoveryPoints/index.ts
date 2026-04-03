// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { update, list, get } from "../../api/recoveryPoints/operations.js";
import type {
  RecoveryPointsUpdateOptionalParams,
  RecoveryPointsListOptionalParams,
  RecoveryPointsGetOptionalParams,
} from "../../api/recoveryPoints/options.js";
import type { RecoveryPointResource, UpdateRecoveryPointRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryPoints operations. */
export interface RecoveryPointsOperations {
  /** UpdateRecoveryPoint to update recovery point for given RecoveryPointID. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    parameters: UpdateRecoveryPointRequest,
    options?: RecoveryPointsUpdateOptionalParams,
  ) => Promise<RecoveryPointResource>;
  /** Lists the backup copies for the backed up item. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    options?: RecoveryPointsListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPointResource>;
  /**
   * Provides the information of the backed up data identified using RecoveryPointID. This is an asynchronous operation.
   * To know the status of the operation, call the GetProtectedItemOperationResult API.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    options?: RecoveryPointsGetOptionalParams,
  ) => Promise<RecoveryPointResource>;
}

function _getRecoveryPoints(context: RecoveryServicesBackupContext) {
  return {
    update: (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      parameters: UpdateRecoveryPointRequest,
      options?: RecoveryPointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        parameters,
        options,
      ),
    list: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      options?: RecoveryPointsListOptionalParams,
    ) =>
      list(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        options,
      ),
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      options?: RecoveryPointsGetOptionalParams,
    ) =>
      get(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        options,
      ),
  };
}

export function _getRecoveryPointsOperations(
  context: RecoveryServicesBackupContext,
): RecoveryPointsOperations {
  return {
    ..._getRecoveryPoints(context),
  };
}
