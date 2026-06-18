// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesContext as Client } from "./index.js";
import {
  OperationResource,
  operationResourceDeserializer,
  cloudErrorDeserializer,
  Vault,
  vaultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { GetOperationResultOptionalParams, GetOperationStatusOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getOperationResultSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: GetOperationResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getOperationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<Vault | undefined> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? vaultDeserializer(result.body) : undefined;
}

/** Gets the operation result for a resource. */
export async function getOperationResult(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: GetOperationResultOptionalParams = { requestOptions: {} },
): Promise<Vault | undefined> {
  const result = await _getOperationResultSend(
    context,
    resourceGroupName,
    vaultName,
    operationId,
    options,
  );
  return _getOperationResultDeserialize(result);
}

export function _getOperationStatusSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/operationStatus/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return operationResourceDeserializer(result.body);
}

/** Gets the operation status for a resource. */
export async function getOperationStatus(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationResource> {
  const result = await _getOperationStatusSend(
    context,
    resourceGroupName,
    vaultName,
    operationId,
    options,
  );
  return _getOperationStatusDeserialize(result);
}
