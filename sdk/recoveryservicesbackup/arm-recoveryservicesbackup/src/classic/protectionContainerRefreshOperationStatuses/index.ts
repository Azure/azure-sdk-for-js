// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectionContainerRefreshOperationStatuses/operations.js";
import type { ProtectionContainerRefreshOperationStatusesGetOptionalParams } from "../../api/protectionContainerRefreshOperationStatuses/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a ProtectionContainerRefreshOperationStatuses operations. */
export interface ProtectionContainerRefreshOperationStatusesOperations {
  /**
   * Fetches the status of the fabric level asynchronous operation identified by the given operation id. The status
   * can be in progress, completed or failed. You can refer to the OperationStatus enum for all the possible states of
   * an operation. This is the endpoint reported in the Azure-AsyncOperation header of the fabric level operations
   * that start one, such as RefreshContainers and GetRPExtendedInfo.
   */
  get: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    operationId: string,
    options?: ProtectionContainerRefreshOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getProtectionContainerRefreshOperationStatuses(context: RecoveryServicesBackupContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      operationId: string,
      options?: ProtectionContainerRefreshOperationStatusesGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, fabricName, operationId, options),
  };
}

export function _getProtectionContainerRefreshOperationStatusesOperations(
  context: RecoveryServicesBackupContext,
): ProtectionContainerRefreshOperationStatusesOperations {
  return {
    ..._getProtectionContainerRefreshOperationStatuses(context),
  };
}
