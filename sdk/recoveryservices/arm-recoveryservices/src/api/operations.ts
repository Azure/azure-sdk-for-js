// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "./index.js";
import type { OperationResource, Vault } from "../models/models.js";
import {
  operationResourceDeserializer,
  cloudErrorDeserializer,
  vaultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  GetOperationResultOptionalParams,
  GetOperationStatusOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<Vault> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultDeserializer(result.body);
}

/** Gets the operation result for a resource. */
export async function getOperationResult(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: GetOperationResultOptionalParams = { requestOptions: {} },
): Promise<Vault | null> {
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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
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
