// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext as Client } from "../index.js";
import type {
  VirtualNetworkSubnet,
  VirtualNetworkSubnetUpdateRequest,
  _VirtualNetworkSubnetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  virtualNetworkSubnetSerializer,
  virtualNetworkSubnetDeserializer,
  virtualNetworkSubnetUpdateRequestSerializer,
  _virtualNetworkSubnetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkSubnetsListByVirtualNetworkOptionalParams,
  VirtualNetworkSubnetsDeleteOptionalParams,
  VirtualNetworkSubnetsUpdateOptionalParams,
  VirtualNetworkSubnetsCreateOrUpdateOptionalParams,
  VirtualNetworkSubnetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVirtualNetworkSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworkSubnetsListByVirtualNetworkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualNetworks/{virtualNetworkName}/subnets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listByVirtualNetworkDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkSubnetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkSubnetListResultDeserializer(result.body);
}

/** Lists all of the virtual network subnets in a  virtual network. */
export function listByVirtualNetwork(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworkSubnetsListByVirtualNetworkOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkSubnet> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVirtualNetworkSend(context, resourceGroupName, virtualNetworkName, options),
    _listByVirtualNetworkDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: VirtualNetworkSubnetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

/** The operation to delete a virtual network. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: VirtualNetworkSubnetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualNetworkName, subnetName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  properties: VirtualNetworkSubnetUpdateRequest,
  options: VirtualNetworkSubnetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkSubnetUpdateRequestSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkSubnet> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return virtualNetworkSubnetDeserializer(result.body);
}

/** The operation to update a virtual network subnet. */
export function update(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  properties: VirtualNetworkSubnetUpdateRequest,
  options: VirtualNetworkSubnetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkSubnet>, VirtualNetworkSubnet> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, virtualNetworkName, subnetName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<VirtualNetworkSubnet>, VirtualNetworkSubnet>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  resource: VirtualNetworkSubnet,
  options: VirtualNetworkSubnetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkSubnetSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkSubnet> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return virtualNetworkSubnetDeserializer(result.body);
}

/** The operation to create or update a virtual network subnet. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  resource: VirtualNetworkSubnet,
  options: VirtualNetworkSubnetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkSubnet>, VirtualNetworkSubnet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<VirtualNetworkSubnet>, VirtualNetworkSubnet>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: VirtualNetworkSubnetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkSubnet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return virtualNetworkSubnetDeserializer(result.body);
}

/** The operation to get a virtual network subnet. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: VirtualNetworkSubnetsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkSubnet> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    options,
  );
  return _getDeserialize(result);
}
