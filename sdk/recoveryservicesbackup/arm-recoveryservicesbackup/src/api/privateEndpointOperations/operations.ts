// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { OperationStatus } from "../../models/models.js";
import { errorResponseDeserializer, operationStatusDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateEndpointOperationsGetOperationStatusOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getOperationStatusSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  privateEndpointConnectionName: string,
  operationId: string,
  options: PrivateEndpointOperationsGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}/operationsStatus/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Gets the operation status for a private endpoint connection. */
export async function getOperationStatus(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  privateEndpointConnectionName: string,
  operationId: string,
  options: PrivateEndpointOperationsGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getOperationStatusSend(
    context,
    vaultName,
    resourceGroupName,
    privateEndpointConnectionName,
    operationId,
    options,
  );
  return _getOperationStatusDeserialize(result);
}
