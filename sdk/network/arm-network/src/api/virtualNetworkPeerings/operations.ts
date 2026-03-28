// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { VirtualNetworkPeering } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  virtualNetworkPeeringSerializer,
  virtualNetworkPeeringDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _VirtualNetworkPeeringListResult } from "../../models/models.js";
import { _virtualNetworkPeeringListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkPeeringsListOptionalParams,
  VirtualNetworkPeeringsDeleteOptionalParams,
  VirtualNetworkPeeringsCreateOrUpdateOptionalParams,
  VirtualNetworkPeeringsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworkPeeringsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkPeeringListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkPeeringListResultDeserializer(result.body);
}

/** Gets all virtual network peerings in a virtual network. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: VirtualNetworkPeeringsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkPeering> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, virtualNetworkName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  virtualNetworkPeeringName: string,
  options: VirtualNetworkPeeringsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      virtualNetworkPeeringName: virtualNetworkPeeringName,
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

/** Deletes the specified virtual network peering. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  virtualNetworkPeeringName: string,
  options: VirtualNetworkPeeringsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  virtualNetworkPeeringName: string,
  virtualNetworkPeeringParameters: VirtualNetworkPeering,
  options: VirtualNetworkPeeringsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}{?api%2Dversion,syncRemoteAddressSpace}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      virtualNetworkPeeringName: virtualNetworkPeeringName,
      "api%2Dversion": "2025-05-01",
      syncRemoteAddressSpace: options?.syncRemoteAddressSpace,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkPeeringSerializer(virtualNetworkPeeringParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkPeering> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkPeeringDeserializer(result.body);
}

/** Creates or updates a peering in the specified virtual network. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  virtualNetworkPeeringName: string,
  virtualNetworkPeeringParameters: VirtualNetworkPeering,
  options: VirtualNetworkPeeringsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkPeering>, VirtualNetworkPeering> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkName,
        virtualNetworkPeeringName,
        virtualNetworkPeeringParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetworkPeering>, VirtualNetworkPeering>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  virtualNetworkPeeringName: string,
  options: VirtualNetworkPeeringsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      virtualNetworkPeeringName: virtualNetworkPeeringName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkPeering> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkPeeringDeserializer(result.body);
}

/** Gets the specified virtual network peering. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  virtualNetworkPeeringName: string,
  options: VirtualNetworkPeeringsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkPeering> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    virtualNetworkPeeringName,
    options,
  );
  return _getDeserialize(result);
}
