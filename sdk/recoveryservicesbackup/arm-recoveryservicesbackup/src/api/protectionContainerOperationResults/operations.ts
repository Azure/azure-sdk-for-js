// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ProtectionContainerResource,
  protectionContainerResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ProtectionContainerOperationResultsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  operationId: string,
  options: ProtectionContainerOperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainerResource | undefined> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? protectionContainerResourceDeserializer(result.body) : undefined;
}

/** Fetches the result of any operation on the container. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  operationId: string,
  options: ProtectionContainerOperationResultsGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionContainerResource | undefined> {
  const result = await _getSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
