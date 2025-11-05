// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext as Client } from "../index.js";
import type { DataflowResource, _DataflowResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dataflowResourceSerializer,
  dataflowResourceDeserializer,
  _dataflowResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataflowListByResourceGroupOptionalParams,
  DataflowDeleteOptionalParams,
  DataflowCreateOrUpdateOptionalParams,
  DataflowGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowProfileName: dataflowProfileName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataflowResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dataflowResourceListResultDeserializer(result.body);
}

/** List DataflowResource resources by DataflowProfileResource */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataflowResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceGroupSend(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        options,
      ),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows/{dataflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowProfileName: dataflowProfileName,
      dataflowName: dataflowName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Delete a DataflowResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  resource: DataflowResource,
  options: DataflowCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows/{dataflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowProfileName: dataflowProfileName,
      dataflowName: dataflowName,
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
    body: dataflowResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dataflowResourceDeserializer(result.body);
}

/** Create a DataflowResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  resource: DataflowResource,
  options: DataflowCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataflowResource>, DataflowResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DataflowResource>, DataflowResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows/{dataflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      dataflowProfileName: dataflowProfileName,
      dataflowName: dataflowName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DataflowResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dataflowResourceDeserializer(result.body);
}

/** Get a DataflowResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowGetOptionalParams = { requestOptions: {} },
): Promise<DataflowResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    instanceName,
    dataflowProfileName,
    dataflowName,
    options,
  );
  return _getDeserialize(result);
}
