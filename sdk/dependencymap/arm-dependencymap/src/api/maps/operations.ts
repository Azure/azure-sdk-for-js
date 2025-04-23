// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MapsResource,
  mapsResourceSerializer,
  mapsResourceDeserializer,
  MapsResourceTagsUpdate,
  mapsResourceTagsUpdateSerializer,
  _MapsResourceListResult,
  _mapsResourceListResultDeserializer,
  GetDependencyViewForFocusedMachineRequest,
  getDependencyViewForFocusedMachineRequestSerializer,
  GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  getConnectionsWithConnectedMachineForFocusedMachineRequestSerializer,
  GetConnectionsForProcessOnFocusedMachineRequest,
  getConnectionsForProcessOnFocusedMachineRequestSerializer,
  ExportDependenciesRequest,
  exportDependenciesRequestSerializer,
} from "../../models/models.js";
import {
  MapsExportDependenciesOptionalParams,
  MapsGetConnectionsForProcessOnFocusedMachineOptionalParams,
  MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams,
  MapsGetDependencyViewForFocusedMachineOptionalParams,
  MapsListBySubscriptionOptionalParams,
  MapsListByResourceGroupOptionalParams,
  MapsDeleteOptionalParams,
  MapsUpdateOptionalParams,
  MapsCreateOrUpdateOptionalParams,
  MapsGetOptionalParams,
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

export function _exportDependenciesSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: ExportDependenciesRequest,
  options: MapsExportDependenciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/exportDependencies{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: exportDependenciesRequestSerializer(body),
  });
}

export async function _exportDependenciesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Export dependencies */
export function exportDependencies(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: ExportDependenciesRequest,
  options: MapsExportDependenciesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _exportDependenciesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _exportDependenciesSend(context, resourceGroupName, mapName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getConnectionsForProcessOnFocusedMachineSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: GetConnectionsForProcessOnFocusedMachineRequest,
  options: MapsGetConnectionsForProcessOnFocusedMachineOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/getConnectionsForProcessOnFocusedMachine{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getConnectionsForProcessOnFocusedMachineRequestSerializer(body),
  });
}

export async function _getConnectionsForProcessOnFocusedMachineDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get network connections of a process */
export function getConnectionsForProcessOnFocusedMachine(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: GetConnectionsForProcessOnFocusedMachineRequest,
  options: MapsGetConnectionsForProcessOnFocusedMachineOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _getConnectionsForProcessOnFocusedMachineDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getConnectionsForProcessOnFocusedMachineSend(
          context,
          resourceGroupName,
          mapName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getConnectionsWithConnectedMachineForFocusedMachineSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  options: MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/getConnectionsWithConnectedMachineForFocusedMachine{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getConnectionsWithConnectedMachineForFocusedMachineRequestSerializer(body),
  });
}

export async function _getConnectionsWithConnectedMachineForFocusedMachineDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get network connections between machines */
export function getConnectionsWithConnectedMachineForFocusedMachine(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  options: MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _getConnectionsWithConnectedMachineForFocusedMachineDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getConnectionsWithConnectedMachineForFocusedMachineSend(
          context,
          resourceGroupName,
          mapName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getDependencyViewForFocusedMachineSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: GetDependencyViewForFocusedMachineRequest,
  options: MapsGetDependencyViewForFocusedMachineOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}/getDependencyViewForFocusedMachine{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getDependencyViewForFocusedMachineRequestSerializer(body),
  });
}

export async function _getDependencyViewForFocusedMachineDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get dependency map of single machine */
export function getDependencyViewForFocusedMachine(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  body: GetDependencyViewForFocusedMachineRequest,
  options: MapsGetDependencyViewForFocusedMachineOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _getDependencyViewForFocusedMachineDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getDependencyViewForFocusedMachineSend(context, resourceGroupName, mapName, body, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: MapsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DependencyMap/maps{?api%2Dversion}",
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
): Promise<_MapsResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _mapsResourceListResultDeserializer(result.body);
}

/** List MapsResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: MapsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MapsResource> {
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
  options: MapsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps{?api%2Dversion}",
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
): Promise<_MapsResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _mapsResourceListResultDeserializer(result.body);
}

/** List MapsResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MapsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MapsResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  options: MapsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}{?api%2Dversion}",
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

/** Delete a MapsResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  options: MapsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, mapName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  properties: MapsResourceTagsUpdate,
  options: MapsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: mapsResourceTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MapsResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mapsResourceDeserializer(result.body);
}

/** Update a MapsResource */
export function update(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  properties: MapsResourceTagsUpdate,
  options: MapsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MapsResource>, MapsResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, mapName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<MapsResource>, MapsResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  resource: MapsResource,
  options: MapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: mapsResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MapsResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mapsResourceDeserializer(result.body);
}

/** Create a MapsResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  resource: MapsResource,
  options: MapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MapsResource>, MapsResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, mapName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<MapsResource>, MapsResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  options: MapsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DependencyMap/maps/{mapName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MapsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mapsResourceDeserializer(result.body);
}

/** Get a MapsResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  mapName: string,
  options: MapsGetOptionalParams = { requestOptions: {} },
): Promise<MapsResource> {
  const result = await _getSend(context, resourceGroupName, mapName, options);
  return _getDeserialize(result);
}
