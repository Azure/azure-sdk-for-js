// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { getOperationStatus } from "../../api/privateEndpointOperations/operations.js";
import type { PrivateEndpointOperationsGetOperationStatusOptionalParams } from "../../api/privateEndpointOperations/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a PrivateEndpointOperations operations. */
export interface PrivateEndpointOperationsOperations {
  /** Gets the operation status for a private endpoint connection. */
  getOperationStatus: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    operationId: string,
    options?: PrivateEndpointOperationsGetOperationStatusOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getPrivateEndpointOperations(context: RecoveryServicesBackupContext) {
  return {
    getOperationStatus: (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      operationId: string,
      options?: PrivateEndpointOperationsGetOperationStatusOptionalParams,
    ) =>
      getOperationStatus(
        context,
        vaultName,
        resourceGroupName,
        privateEndpointConnectionName,
        operationId,
        options,
      ),
  };
}

export function _getPrivateEndpointOperationsOperations(
  context: RecoveryServicesBackupContext,
): PrivateEndpointOperationsOperations {
  return {
    ..._getPrivateEndpointOperations(context),
  };
}
