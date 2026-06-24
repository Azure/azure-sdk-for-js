// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectionContainerOperationResults/operations.js";
import { ProtectionContainerOperationResultsGetOptionalParams } from "../../api/protectionContainerOperationResults/options.js";
import { ProtectionContainerResource } from "../../models/models.js";

/** Interface representing a ProtectionContainerOperationResults operations. */
export interface ProtectionContainerOperationResultsOperations {
  /** Fetches the result of any operation on the container. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    operationId: string,
    options?: ProtectionContainerOperationResultsGetOptionalParams,
  ) => Promise<ProtectionContainerResource | undefined>;
}

function _getProtectionContainerOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      operationId: string,
      options?: ProtectionContainerOperationResultsGetOptionalParams,
    ) =>
      get(context, vaultName, resourceGroupName, fabricName, containerName, operationId, options),
  };
}

export function _getProtectionContainerOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): ProtectionContainerOperationResultsOperations {
  return {
    ..._getProtectionContainerOperationResults(context),
  };
}
