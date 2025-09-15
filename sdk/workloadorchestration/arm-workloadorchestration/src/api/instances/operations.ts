// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Instance,
  instanceSerializer,
  instanceDeserializer,
  _InstanceListResult,
  _instanceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  InstancesListBySolutionOptionalParams,
  InstancesDeleteOptionalParams,
  InstancesUpdateOptionalParams,
  InstancesCreateOrUpdateOptionalParams,
  InstancesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySolutionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  options: InstancesListBySolutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
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

export async function _listBySolutionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _instanceListResultDeserializer(result.body);
}

/** List Instance Resources */
export function listBySolution(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  options: InstancesListBySolutionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Instance> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySolutionSend(context, resourceGroupName, targetName, solutionName, options),
    _listBySolutionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  options: InstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      instanceName: instanceName,
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

/** Delete Instance Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  options: InstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, targetName, solutionName, instanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  properties: Instance,
  options: InstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      instanceName: instanceName,
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
    body: instanceSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Instance> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceDeserializer(result.body);
}

/** Update an Instance Resource */
export function update(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  properties: Instance,
  options: InstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Instance>, Instance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        instanceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Instance>, Instance>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  resource: Instance,
  options: InstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      instanceName: instanceName,
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
    body: instanceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Instance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceDeserializer(result.body);
}

/** Create or update Instance Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  resource: Instance,
  options: InstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Instance>, Instance> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        instanceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Instance>, Instance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  options: InstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      instanceName: instanceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Instance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceDeserializer(result.body);
}

/** Get Instance Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  options: InstancesGetOptionalParams = { requestOptions: {} },
): Promise<Instance> {
  const result = await _getSend(
    context,
    resourceGroupName,
    targetName,
    solutionName,
    instanceName,
    options,
  );
  return _getDeserialize(result);
}
