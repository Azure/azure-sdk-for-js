// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DataflowEndpointResource,
  dataflowEndpointResourceSerializer,
  dataflowEndpointResourceDeserializer,
  _DataflowEndpointResourceListResult,
  _dataflowEndpointResourceListResultDeserializer,
} from "../../models/models.js";
import {
  DataflowEndpointListByResourceGroupOptionalParams,
  DataflowEndpointDeleteOptionalParams,
  DataflowEndpointCreateOrUpdateOptionalParams,
  DataflowEndpointGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  options: DataflowEndpointListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      "api%2Dversion": apiVersion,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataflowEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dataflowEndpointResourceListResultDeserializer(result.body);
}

/** List DataflowEndpointResource resources by InstanceResource */
export function listByResourceGroup(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  options: DataflowEndpointListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DataflowEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, apiVersion, resourceGroupName, instanceName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowEndpointName: string,
  options: DataflowEndpointDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowEndpoints/{dataflowEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowEndpointName: dataflowEndpointName,
      "api%2Dversion": apiVersion,
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

/** Delete a DataflowEndpointResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowEndpointName: string,
  options: DataflowEndpointDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowEndpointName: string,
  resource: DataflowEndpointResource,
  options: DataflowEndpointCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowEndpoints/{dataflowEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowEndpointName: dataflowEndpointName,
      "api%2Dversion": apiVersion,
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
    body: dataflowEndpointResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowEndpointResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dataflowEndpointResourceDeserializer(result.body);
}

/** Create a DataflowEndpointResource */
export function createOrUpdate(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowEndpointName: string,
  resource: DataflowEndpointResource,
  options: DataflowEndpointCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DataflowEndpointResource>, DataflowEndpointResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DataflowEndpointResource>, DataflowEndpointResource>;
}

export function _getSend(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowEndpointName: string,
  options: DataflowEndpointGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowEndpoints/{dataflowEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowEndpointName: dataflowEndpointName,
      "api%2Dversion": apiVersion,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dataflowEndpointResourceDeserializer(result.body);
}

/** Get a DataflowEndpointResource */
export async function get(
  context: Client,
  apiVersion: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowEndpointName: string,
  options: DataflowEndpointGetOptionalParams = { requestOptions: {} },
): Promise<DataflowEndpointResource> {
  const result = await _getSend(
    context,
    apiVersion,
    resourceGroupName,
    instanceName,
    dataflowEndpointName,
    options,
  );
  return _getDeserialize(result);
}
