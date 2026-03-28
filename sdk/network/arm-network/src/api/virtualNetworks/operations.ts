// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  PublicIpDdosProtectionStatusResult,
  VirtualNetwork,
  IPAddressAvailabilityResult,
  _VirtualNetworkListUsageResult,
  VirtualNetworkUsage,
  _VirtualNetworkDdosProtectionStatusResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  virtualNetworkSerializer,
  virtualNetworkDeserializer,
  ipAddressAvailabilityResultDeserializer,
  _virtualNetworkListUsageResultDeserializer,
  _virtualNetworkDdosProtectionStatusResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _VirtualNetworkListResult } from "../../models/models.js";
import { _virtualNetworkListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworksListDdosProtectionStatusOptionalParams,
  VirtualNetworksListUsageOptionalParams,
  VirtualNetworksCheckIPAddressAvailabilityOptionalParams,
  VirtualNetworksListAllOptionalParams,
  VirtualNetworksListOptionalParams,
  VirtualNetworksDeleteOptionalParams,
  VirtualNetworksUpdateTagsOptionalParams,
  VirtualNetworksCreateOrUpdateOptionalParams,
  VirtualNetworksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listDdosProtectionStatusSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksListDdosProtectionStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/ddosProtectionStatus{?api%2Dversion,top,skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": "2025-05-01",
      top: options?.top,
      skipToken: options?.skipToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDdosProtectionStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkDdosProtectionStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkDdosProtectionStatusResultDeserializer(result.body);
}

/** Gets the Ddos Protection Status of all IP Addresses under the Virtual Network */
export function listDdosProtectionStatus(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksListDdosProtectionStatusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicIpDdosProtectionStatusResult> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listDdosProtectionStatusSend(context, resourceGroupName, virtualNetworkName, options),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _listDdosProtectionStatusDeserialize,
    ["202", "200", "201"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listUsageSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksListUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
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

export async function _listUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkListUsageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkListUsageResultDeserializer(result.body);
}

/** Lists usage stats. */
export function listUsage(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksListUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsageSend(context, resourceGroupName, virtualNetworkName, options),
    _listUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _checkIPAddressAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  ipAddress: string,
  options: VirtualNetworksCheckIPAddressAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/checkIPAddressAvailability{?api%2Dversion,ipAddress}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": "2025-05-01",
      ipAddress: ipAddress,
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

export async function _checkIPAddressAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<IPAddressAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ipAddressAvailabilityResultDeserializer(result.body);
}

/** Checks whether a private IP address is available for use. */
export async function checkIPAddressAvailability(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  ipAddress: string,
  options: VirtualNetworksCheckIPAddressAvailabilityOptionalParams = { requestOptions: {} },
): Promise<IPAddressAvailabilityResult> {
  const result = await _checkIPAddressAvailabilitySend(
    context,
    resourceGroupName,
    virtualNetworkName,
    ipAddress,
    options,
  );
  return _checkIPAddressAvailabilityDeserialize(result);
}

export function _listAllSend(
  context: Client,
  options: VirtualNetworksListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/virtualNetworks{?api%2Dversion}",
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
): Promise<_VirtualNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkListResultDeserializer(result.body);
}

/** Gets all virtual networks in a subscription. */
export function listAll(
  context: Client,
  options: VirtualNetworksListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetwork> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkListResultDeserializer(result.body);
}

/** Gets all virtual networks in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetwork> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
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

/** Deletes the specified virtual network. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, virtualNetworkName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: TagsObject,
  options: VirtualNetworksUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
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
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkDeserializer(result.body);
}

/** Updates a virtual network tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: TagsObject,
  options: VirtualNetworksUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<VirtualNetwork> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: VirtualNetwork,
  options: VirtualNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
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
    body: virtualNetworkSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetwork> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkDeserializer(result.body);
}

/** Creates or updates a virtual network in the specified resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: VirtualNetwork,
  options: VirtualNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetwork>, VirtualNetwork> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, virtualNetworkName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetwork>, VirtualNetwork>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkDeserializer(result.body);
}

/** Gets the specified virtual network by resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworksGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetwork> {
  const result = await _getSend(context, resourceGroupName, virtualNetworkName, options);
  return _getDeserialize(result);
}
