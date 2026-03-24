// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { getOperationStatus } from "../../api/privateEndpoint/operations.js";
import type { PrivateEndpointGetOperationStatusOptionalParams } from "../../api/privateEndpoint/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a PrivateEndpoint operations. */
export interface PrivateEndpointOperations {
  /** Gets the operation status for a private endpoint connection. */
  getOperationStatus: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    operationId: string,
    options?: PrivateEndpointGetOperationStatusOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getPrivateEndpoint(context: RecoveryServicesBackupContext) {
  return {
    getOperationStatus: (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      operationId: string,
      options?: PrivateEndpointGetOperationStatusOptionalParams,
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

export function _getPrivateEndpointOperations(
  context: RecoveryServicesBackupContext,
): PrivateEndpointOperations {
  return {
    ..._getPrivateEndpoint(context),
  };
}
