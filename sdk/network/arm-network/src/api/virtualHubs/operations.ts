// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  VirtualHub,
  _ListVirtualHubsResult,
  VirtualHubEffectiveRouteList,
  GetInboundRoutesParameters,
  EffectiveRouteMapRouteList,
  GetOutboundRoutesParameters,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  virtualHubSerializer,
  virtualHubDeserializer,
  _listVirtualHubsResultDeserializer,
  effectiveRoutesParametersSerializer,
  virtualHubEffectiveRouteListDeserializer,
  getInboundRoutesParametersSerializer,
  effectiveRouteMapRouteListDeserializer,
  getOutboundRoutesParametersSerializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualHubsGetOutboundRoutesOptionalParams,
  VirtualHubsGetInboundRoutesOptionalParams,
  VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
  VirtualHubsListOptionalParams,
  VirtualHubsListByResourceGroupOptionalParams,
  VirtualHubsDeleteOptionalParams,
  VirtualHubsUpdateTagsOptionalParams,
  VirtualHubsCreateOrUpdateOptionalParams,
  VirtualHubsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getOutboundRoutesSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  getOutboundRoutesParameters: GetOutboundRoutesParameters,
  options: VirtualHubsGetOutboundRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/outboundRoutes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getOutboundRoutesParametersSerializer(getOutboundRoutesParameters),
  });
}

export async function _getOutboundRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<EffectiveRouteMapRouteList> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return effectiveRouteMapRouteListDeserializer(result.body);
}

/** Gets the outbound routes configured for the Virtual Hub on a particular connection. */
export function getOutboundRoutes(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  getOutboundRoutesParameters: GetOutboundRoutesParameters,
  options: VirtualHubsGetOutboundRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList> {
  return getLongRunningPoller(context, _getOutboundRoutesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getOutboundRoutesSend(
        context,
        resourceGroupName,
        virtualHubName,
        getOutboundRoutesParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList>;
}

export function _getInboundRoutesSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  getInboundRoutesParameters: GetInboundRoutesParameters,
  options: VirtualHubsGetInboundRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/inboundRoutes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getInboundRoutesParametersSerializer(getInboundRoutesParameters),
  });
}

export async function _getInboundRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<EffectiveRouteMapRouteList> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return effectiveRouteMapRouteListDeserializer(result.body);
}

/** Gets the inbound routes configured for the Virtual Hub on a particular connection. */
export function getInboundRoutes(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  getInboundRoutesParameters: GetInboundRoutesParameters,
  options: VirtualHubsGetInboundRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList> {
  return getLongRunningPoller(context, _getInboundRoutesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getInboundRoutesSend(
        context,
        resourceGroupName,
        virtualHubName,
        getInboundRoutesParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList>;
}

export function _getEffectiveVirtualHubRoutesSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/effectiveRoutes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["effectiveRoutesParameters"]
      ? options["effectiveRoutesParameters"]
      : effectiveRoutesParametersSerializer(options["effectiveRoutesParameters"]),
  });
}

export async function _getEffectiveVirtualHubRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualHubEffectiveRouteList> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualHubEffectiveRouteListDeserializer(result.body);
}

/** Gets the effective routes configured for the Virtual Hub resource or the specified resource . */
export function getEffectiveVirtualHubRoutes(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualHubEffectiveRouteList>, VirtualHubEffectiveRouteList> {
  return getLongRunningPoller(
    context,
    _getEffectiveVirtualHubRoutesDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getEffectiveVirtualHubRoutesSend(context, resourceGroupName, virtualHubName, options),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<VirtualHubEffectiveRouteList>, VirtualHubEffectiveRouteList>;
}

export function _listSend(
  context: Client,
  options: VirtualHubsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/virtualHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVirtualHubsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVirtualHubsResultDeserializer(result.body);
}

/** Lists all the VirtualHubs in a subscription. */
export function list(
  context: Client,
  options: VirtualHubsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualHub> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualHubsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVirtualHubsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVirtualHubsResultDeserializer(result.body);
}

/** Lists all the VirtualHubs in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VirtualHubsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualHub> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a VirtualHub. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, virtualHubName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  virtualHubParameters: TagsObject,
  options: VirtualHubsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(virtualHubParameters),
  });
}

export async function _updateTagsDeserialize(result: PathUncheckedResponse): Promise<VirtualHub> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualHubDeserializer(result.body);
}

/** Updates VirtualHub tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  virtualHubParameters: TagsObject,
  options: VirtualHubsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<VirtualHub> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    virtualHubName,
    virtualHubParameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  virtualHubParameters: VirtualHub,
  options: VirtualHubsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualHubSerializer(virtualHubParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualHub> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualHubDeserializer(result.body);
}

/** Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  virtualHubParameters: VirtualHub,
  options: VirtualHubsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualHub>, VirtualHub> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualHubName,
        virtualHubParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualHub>, VirtualHub>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualHub> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualHubDeserializer(result.body);
}

/** Retrieves the details of a VirtualHub. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualHub> {
  const result = await _getSend(context, resourceGroupName, virtualHubName, options);
  return _getDeserialize(result);
}
