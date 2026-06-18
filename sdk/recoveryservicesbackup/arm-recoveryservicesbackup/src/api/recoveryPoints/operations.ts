// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _RecoveryPointResourceList,
  _recoveryPointResourceListDeserializer,
  RecoveryPointResource,
  recoveryPointResourceDeserializer,
  UpdateRecoveryPointRequest,
  updateRecoveryPointRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RecoveryPointsUpdateOptionalParams,
  RecoveryPointsListOptionalParams,
  RecoveryPointsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  parameters: UpdateRecoveryPointRequest,
  options: RecoveryPointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      recoveryPointId: recoveryPointId,
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: updateRecoveryPointRequestSerializer(parameters),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryPointResourceDeserializer(result.body);
}

/** UpdateRecoveryPoint to update recovery point for given RecoveryPointID. */
export async function update(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  parameters: UpdateRecoveryPointRequest,
  options: RecoveryPointsUpdateOptionalParams = { requestOptions: {} },
): Promise<RecoveryPointResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    vaultName,
    fabricName,
    containerName,
    protectedItemName,
    recoveryPointId,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _listSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  options: RecoveryPointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoveryPointResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _recoveryPointResourceListDeserializer(result.body);
}

/** Lists the backup copies for the backed up item. */
export function list(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  options: RecoveryPointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryPointResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        options,
      ),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-31-preview",
    },
  );
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  options: RecoveryPointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      recoveryPointId: recoveryPointId,
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
): Promise<RecoveryPointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryPointResourceDeserializer(result.body);
}

/**
 * Provides the information of the backed up data identified using RecoveryPointID. This is an asynchronous operation.
 * To know the status of the operation, call the GetProtectedItemOperationResult API.
 */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  options: RecoveryPointsGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryPointResource> {
  const result = await _getSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
    protectedItemName,
    recoveryPointId,
    options,
  );
  return _getDeserialize(result);
}
