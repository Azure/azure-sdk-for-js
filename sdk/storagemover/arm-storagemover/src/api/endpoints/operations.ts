// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Endpoint,
  endpointSerializer,
  endpointDeserializer,
  EndpointBaseUpdateParameters,
  endpointBaseUpdateParametersSerializer,
  _EndpointList,
  _endpointListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_EndpointList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _endpointListDeserializer(result.body);
}

/** Lists all Endpoints in a Storage Mover. */
export function list(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Endpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, storageMoverName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an Endpoint resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageMoverName, endpointName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  endpointParam: EndpointBaseUpdateParameters,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      endpointName: endpointName,
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
    body: endpointBaseUpdateParametersSerializer(endpointParam),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged. */
export async function update(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  endpointParam: EndpointBaseUpdateParameters,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    storageMoverName,
    endpointName,
    endpointParam,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  endpointParam: Endpoint,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      endpointName: endpointName,
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
    body: endpointSerializer(endpointParam),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Creates or updates an Endpoint resource, which represents a data transfer source or destination. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  endpointParam: Endpoint,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    storageMoverName,
    endpointName,
    endpointParam,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      endpointName: endpointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Gets an Endpoint resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageMoverName,
    endpointName,
    options,
  );
  return _getDeserialize(result);
}
