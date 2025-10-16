// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  WorkloadResource,
  WorkloadPatchModel,
  _WorkloadResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workloadResourceSerializer,
  workloadResourceDeserializer,
  workloadPatchModelSerializer,
  _workloadResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkloadListBySubscriptionOptionalParams,
  WorkloadListByEnclaveResourceOptionalParams,
  WorkloadDeleteOptionalParams,
  WorkloadUpdateOptionalParams,
  WorkloadCreateOrUpdateOptionalParams,
  WorkloadGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  virtualEnclaveName: string,
  options: WorkloadListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/workloads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      virtualEnclaveName: virtualEnclaveName,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkloadResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workloadResourceListResultDeserializer(result.body);
}

/** List WorkloadResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  virtualEnclaveName: string,
  options: WorkloadListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkloadResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, virtualEnclaveName, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByEnclaveResourceSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: WorkloadListByEnclaveResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/workloads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
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

export async function _listByEnclaveResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkloadResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workloadResourceListResultDeserializer(result.body);
}

/** List WorkloadResource resources by EnclaveResource */
export function listByEnclaveResource(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: WorkloadListByEnclaveResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkloadResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnclaveResourceSend(context, resourceGroupName, virtualEnclaveName, options),
    _listByEnclaveResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  options: WorkloadDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/workloads/{workloadName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      workloadName: workloadName,
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

/** Delete a WorkloadResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  options: WorkloadDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualEnclaveName, workloadName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  properties: WorkloadPatchModel,
  options: WorkloadUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/workloads/{workloadName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      workloadName: workloadName,
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
    body: workloadPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<WorkloadResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadResourceDeserializer(result.body);
}

/** Update a WorkloadResource */
export function update(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  properties: WorkloadPatchModel,
  options: WorkloadUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkloadResource>, WorkloadResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        virtualEnclaveName,
        workloadName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<WorkloadResource>, WorkloadResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  resource: WorkloadResource,
  options: WorkloadCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/workloads/{workloadName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      workloadName: workloadName,
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
    body: workloadResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkloadResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadResourceDeserializer(result.body);
}

/** Create a WorkloadResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  resource: WorkloadResource,
  options: WorkloadCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkloadResource>, WorkloadResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualEnclaveName,
        workloadName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<WorkloadResource>, WorkloadResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  options: WorkloadGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/workloads/{workloadName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      workloadName: workloadName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkloadResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadResourceDeserializer(result.body);
}

/** Get a WorkloadResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  workloadName: string,
  options: WorkloadGetOptionalParams = { requestOptions: {} },
): Promise<WorkloadResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualEnclaveName,
    workloadName,
    options,
  );
  return _getDeserialize(result);
}
