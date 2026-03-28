// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { VirtualNetworkTap, TagsObject } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  virtualNetworkTapSerializer,
  virtualNetworkTapDeserializer,
  tagsObjectSerializer,
} from "../../models/microsoft/network/models.js";
import type { _VirtualNetworkTapListResult } from "../../models/models.js";
import { _virtualNetworkTapListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkTapsListAllOptionalParams,
  VirtualNetworkTapsListByResourceGroupOptionalParams,
  VirtualNetworkTapsDeleteOptionalParams,
  VirtualNetworkTapsUpdateTagsOptionalParams,
  VirtualNetworkTapsCreateOrUpdateOptionalParams,
  VirtualNetworkTapsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: VirtualNetworkTapsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/virtualNetworkTaps{?api%2Dversion}",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkTapListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkTapListResultDeserializer(result.body);
}

/** Gets all the VirtualNetworkTaps in a subscription. */
export function listAll(
  context: Client,
  options: VirtualNetworkTapsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkTap> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkTapsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps{?api%2Dversion}",
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
): Promise<_VirtualNetworkTapListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkTapListResultDeserializer(result.body);
}

/** Gets all the VirtualNetworkTaps in a subscription. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkTapsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkTap> {
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
  tapName: string,
  options: VirtualNetworkTapsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps/{tapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      tapName: tapName,
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

/** Delete a VirtualNetworkTap */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  options: VirtualNetworkTapsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, tapName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  tapParameters: TagsObject,
  options: VirtualNetworkTapsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps/{tapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      tapName: tapName,
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
    body: tagsObjectSerializer(tapParameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkTap> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkTapDeserializer(result.body);
}

/** Update a VirtualNetworkTap */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  tapParameters: TagsObject,
  options: VirtualNetworkTapsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkTap> {
  const result = await _updateTagsSend(context, resourceGroupName, tapName, tapParameters, options);
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  parameters: VirtualNetworkTap,
  options: VirtualNetworkTapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps/{tapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      tapName: tapName,
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
    body: virtualNetworkTapSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkTap> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkTapDeserializer(result.body);
}

/** Create a VirtualNetworkTap */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  parameters: VirtualNetworkTap,
  options: VirtualNetworkTapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkTap>, VirtualNetworkTap> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, tapName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetworkTap>, VirtualNetworkTap>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  options: VirtualNetworkTapsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps/{tapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      tapName: tapName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualNetworkTap> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkTapDeserializer(result.body);
}

/** Get a VirtualNetworkTap */
export async function get(
  context: Client,
  resourceGroupName: string,
  tapName: string,
  options: VirtualNetworkTapsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkTap> {
  const result = await _getSend(context, resourceGroupName, tapName, options);
  return _getDeserialize(result);
}
