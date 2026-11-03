// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { OperationStatus } from "../../models/models.js";
import { errorResponseDeserializer, operationStatusDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ProtectionContainerRefreshOperationStatusesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  operationId: string,
  options: ProtectionContainerRefreshOperationStatusesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/operationsStatus/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationStatus> {
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

/**
 * Fetches the status of the fabric level asynchronous operation identified by the given operation id. The status
 * can be in progress, completed or failed. You can refer to the OperationStatus enum for all the possible states of
 * an operation. This is the endpoint reported in the Azure-AsyncOperation header of the fabric level operations
 * that start one, such as RefreshContainers and GetRPExtendedInfo.
 */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  operationId: string,
  options: ProtectionContainerRefreshOperationStatusesGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    fabricName,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
