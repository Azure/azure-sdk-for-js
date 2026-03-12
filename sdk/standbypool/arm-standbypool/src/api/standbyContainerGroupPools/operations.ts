// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  StandbyContainerGroupPoolResource,
  standbyContainerGroupPoolResourceSerializer,
  standbyContainerGroupPoolResourceDeserializer,
  StandbyContainerGroupPoolResourceUpdate,
  standbyContainerGroupPoolResourceUpdateSerializer,
  _StandbyContainerGroupPoolResourceListResult,
  _standbyContainerGroupPoolResourceListResultDeserializer,
} from "../../models/models.js";
import {
  StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
  StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  StandbyContainerGroupPoolsUpdateOptionalParams,
  StandbyContainerGroupPoolsDeleteOptionalParams,
  StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  StandbyContainerGroupPoolsGetOptionalParams,
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

export function _listBySubscriptionSend(
  context: Client,
  options: StandbyContainerGroupPoolsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StandbyPool/standbyContainerGroupPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
): Promise<_StandbyContainerGroupPoolResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _standbyContainerGroupPoolResourceListResultDeserializer(result.body);
}

/** List StandbyContainerGroupPoolResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: StandbyContainerGroupPoolsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyContainerGroupPoolResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: StandbyContainerGroupPoolsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
): Promise<_StandbyContainerGroupPoolResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _standbyContainerGroupPoolResourceListResultDeserializer(result.body);
}

/** List StandbyContainerGroupPoolResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StandbyContainerGroupPoolsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyContainerGroupPoolResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  properties: StandbyContainerGroupPoolResourceUpdate,
  options: StandbyContainerGroupPoolsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyContainerGroupPoolName: standbyContainerGroupPoolName,
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
    body: standbyContainerGroupPoolResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return standbyContainerGroupPoolResourceDeserializer(result.body);
}

/** Update a StandbyContainerGroupPoolResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  properties: StandbyContainerGroupPoolResourceUpdate,
  options: StandbyContainerGroupPoolsUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyContainerGroupPoolResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    standbyContainerGroupPoolName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyContainerGroupPoolName: standbyContainerGroupPoolName,
      "api%2Dversion": context.apiVersion,
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

/** Delete a StandbyContainerGroupPoolResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, standbyContainerGroupPoolName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  resource: StandbyContainerGroupPoolResource,
  options: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyContainerGroupPoolName: standbyContainerGroupPoolName,
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
    body: standbyContainerGroupPoolResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return standbyContainerGroupPoolResourceDeserializer(result.body);
}

/** Create a StandbyContainerGroupPoolResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  resource: StandbyContainerGroupPoolResource,
  options: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<StandbyContainerGroupPoolResource>,
  StandbyContainerGroupPoolResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        standbyContainerGroupPoolName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<StandbyContainerGroupPoolResource>,
    StandbyContainerGroupPoolResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyContainerGroupPoolName: standbyContainerGroupPoolName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return standbyContainerGroupPoolResourceDeserializer(result.body);
}

/** Get a StandbyContainerGroupPoolResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsGetOptionalParams = { requestOptions: {} },
): Promise<StandbyContainerGroupPoolResource> {
  const result = await _getSend(context, resourceGroupName, standbyContainerGroupPoolName, options);
  return _getDeserialize(result);
}
