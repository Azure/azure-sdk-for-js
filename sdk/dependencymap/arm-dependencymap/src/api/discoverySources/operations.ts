// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DiscoverySourceResource,
  discoverySourceResourceSerializer,
  discoverySourceResourceDeserializer,
  DiscoverySourceResourceTagsUpdate,
  discoverySourceResourceTagsUpdateSerializer,
  _DiscoverySourceResourceListResult,
  _discoverySourceResourceListResultDeserializer,
} from "../../models/models.js";
import {
  DiscoverySourcesListByMapsResourceOptionalParams,
  DiscoverySourcesDeleteOptionalParams,
  DiscoverySourcesUpdateOptionalParams,
  DiscoverySourcesCreateOrUpdateOptionalParams,
  DiscoverySourcesGetOptionalParams,
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

export function _listByMapsResourceSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  options: DiscoverySourcesListByMapsResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/discoverySources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mapName: mapName,
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

export async function _listByMapsResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoverySourceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _discoverySourceResourceListResultDeserializer(result.body);
}

/** List DiscoverySourceResource resources by MapsResource */
export function listByMapsResource(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  options: DiscoverySourcesListByMapsResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DiscoverySourceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByMapsResourceSend(context, resourceGroupName, mapName, options),
    _listByMapsResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  options: DiscoverySourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/discoverySources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mapName: mapName,
      sourceName: sourceName,
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

/** Delete a DiscoverySourceResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  options: DiscoverySourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, mapName, sourceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  properties: DiscoverySourceResourceTagsUpdate,
  options: DiscoverySourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/discoverySources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mapName: mapName,
      sourceName: sourceName,
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
    body: discoverySourceResourceTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoverySourceResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discoverySourceResourceDeserializer(result.body);
}

/** Update a DiscoverySourceResource */
export function update(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  properties: DiscoverySourceResourceTagsUpdate,
  options: DiscoverySourcesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiscoverySourceResource>, DiscoverySourceResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, mapName, sourceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DiscoverySourceResource>, DiscoverySourceResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  resource: DiscoverySourceResource,
  options: DiscoverySourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/discoverySources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mapName: mapName,
      sourceName: sourceName,
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
    body: discoverySourceResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoverySourceResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discoverySourceResourceDeserializer(result.body);
}

/** Create a DiscoverySourceResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  resource: DiscoverySourceResource,
  options: DiscoverySourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DiscoverySourceResource>, DiscoverySourceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, mapName, sourceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DiscoverySourceResource>, DiscoverySourceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  options: DiscoverySourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/discoverySources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mapName: mapName,
      sourceName: sourceName,
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
): Promise<DiscoverySourceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discoverySourceResourceDeserializer(result.body);
}

/** Get a DiscoverySourceResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  sourceName: string,
  options: DiscoverySourcesGetOptionalParams = { requestOptions: {} },
): Promise<DiscoverySourceResource> {
  const result = await _getSend(context, resourceGroupName, mapName, sourceName, options);
  return _getDeserialize(result);
}
