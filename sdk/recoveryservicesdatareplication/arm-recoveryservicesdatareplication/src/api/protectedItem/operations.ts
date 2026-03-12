// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ProtectedItemModel,
  protectedItemModelSerializer,
  protectedItemModelDeserializer,
  ProtectedItemModelUpdate,
  protectedItemModelUpdateSerializer,
  _ProtectedItemModelListResult,
  _protectedItemModelListResultDeserializer,
  PlannedFailoverModel,
  plannedFailoverModelSerializer,
  plannedFailoverModelDeserializer,
} from "../../models/models.js";
import {
  ProtectedItemPlannedFailoverOptionalParams,
  ProtectedItemListOptionalParams,
  ProtectedItemDeleteOptionalParams,
  ProtectedItemUpdateOptionalParams,
  ProtectedItemCreateOptionalParams,
  ProtectedItemGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _plannedFailoverSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  body: PlannedFailoverModel,
  options: ProtectedItemPlannedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/plannedFailover{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: plannedFailoverModelSerializer(body),
  });
}

export async function _plannedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<PlannedFailoverModel> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return plannedFailoverModelDeserializer(result.body);
}

/** Performs the planned failover on the protected item. */
export function plannedFailover(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  body: PlannedFailoverModel,
  options: ProtectedItemPlannedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PlannedFailoverModel>, PlannedFailoverModel> {
  return getLongRunningPoller(context, _plannedFailoverDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _plannedFailoverSend(context, resourceGroupName, vaultName, protectedItemName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<PlannedFailoverModel>, PlannedFailoverModel>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: ProtectedItemListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems{?api%2Dversion,odataOptions,continuationToken,pageSize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
      odataOptions: options?.odataOptions,
      continuationToken: options?.continuationToken,
      pageSize: options?.pageSize,
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
): Promise<_ProtectedItemModelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _protectedItemModelListResultDeserializer(result.body);
}

/** Gets the list of protected items in the given vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: ProtectedItemListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProtectedItemModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  options: ProtectedItemDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}{?api%2Dversion,forceDelete}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion,
      forceDelete: options?.forceDelete,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Removes the protected item. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  options: ProtectedItemDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, vaultName, protectedItemName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  properties: ProtectedItemModelUpdate,
  options: ProtectedItemUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: protectedItemModelUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectedItemModel> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectedItemModelDeserializer(result.body);
}

/** Performs update on the protected item. */
export function update(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  properties: ProtectedItemModelUpdate,
  options: ProtectedItemUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectedItemModel>, ProtectedItemModel> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, vaultName, protectedItemName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ProtectedItemModel>, ProtectedItemModel>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  resource: ProtectedItemModel,
  options: ProtectedItemCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: protectedItemModelSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectedItemModel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectedItemModelDeserializer(result.body);
}

/** Creates the protected item. */
export function create(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  resource: ProtectedItemModel,
  options: ProtectedItemCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectedItemModel>, ProtectedItemModel> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, vaultName, protectedItemName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ProtectedItemModel>, ProtectedItemModel>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  options: ProtectedItemGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProtectedItemModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectedItemModelDeserializer(result.body);
}

/** Gets the details of the protected item. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  protectedItemName: string,
  options: ProtectedItemGetOptionalParams = { requestOptions: {} },
): Promise<ProtectedItemModel> {
  const result = await _getSend(context, resourceGroupName, vaultName, protectedItemName, options);
  return _getDeserialize(result);
}
