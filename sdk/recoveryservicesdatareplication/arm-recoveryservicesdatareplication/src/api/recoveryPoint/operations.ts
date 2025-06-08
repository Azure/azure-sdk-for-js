// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RecoveryPointModel,
  recoveryPointModelDeserializer,
  _RecoveryPointModelListResult,
  _recoveryPointModelListResultDeserializer,
} from "../../models/models.js";
import { RecoveryPointListOptionalParams, RecoveryPointGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  options: RecoveryPointListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/recoveryPoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      protectedItemName: protectedItemName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoveryPointModelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _recoveryPointModelListResultDeserializer(result.body);
}

/** Gets the list of recovery points of the given protected item. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  options: RecoveryPointListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryPointModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, protectedItemName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  recoveryPointName: string,
  options: RecoveryPointGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      protectedItemName: protectedItemName,
      recoveryPointName: recoveryPointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecoveryPointModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recoveryPointModelDeserializer(result.body);
}

/** Gets the details of the recovery point of a protected item. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  recoveryPointName: string,
  options: RecoveryPointGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryPointModel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    protectedItemName,
    recoveryPointName,
    options,
  );
  return _getDeserialize(result);
}
