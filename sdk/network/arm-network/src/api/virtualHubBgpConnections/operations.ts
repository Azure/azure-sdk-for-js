// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  BgpConnection,
  _ListVirtualHubBgpConnectionResults,
  PeerRoute,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  _listVirtualHubBgpConnectionResultsDeserializer,
  peerRouteArrayRecordDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams,
  VirtualHubBgpConnectionsListLearnedRoutesOptionalParams,
  VirtualHubBgpConnectionsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAdvertisedRoutesSend(
  context: Client,
  resourceGroupName: string,
  hubName: string,
  connectionName: string,
  options: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{hubName}/bgpConnections/{connectionName}/advertisedRoutes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hubName: hubName,
      connectionName: connectionName,
      "api%2Dversion": "2025-05-01",
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

export async function _listAdvertisedRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, PeerRoute[]>> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return peerRouteArrayRecordDeserializer(result.body);
}

/** Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer. */
export function listAdvertisedRoutes(
  context: Client,
  resourceGroupName: string,
  hubName: string,
  connectionName: string,
  options: VirtualHubBgpConnectionsListAdvertisedRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>> {
  return getLongRunningPoller(context, _listAdvertisedRoutesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listAdvertisedRoutesSend(context, resourceGroupName, hubName, connectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>>;
}

export function _listLearnedRoutesSend(
  context: Client,
  resourceGroupName: string,
  hubName: string,
  connectionName: string,
  options: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{hubName}/bgpConnections/{connectionName}/learnedRoutes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hubName: hubName,
      connectionName: connectionName,
      "api%2Dversion": "2025-05-01",
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

export async function _listLearnedRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, PeerRoute[]>> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return peerRouteArrayRecordDeserializer(result.body);
}

/** Retrieves a list of routes the virtual hub bgp connection has learned. */
export function listLearnedRoutes(
  context: Client,
  resourceGroupName: string,
  hubName: string,
  connectionName: string,
  options: VirtualHubBgpConnectionsListLearnedRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>> {
  return getLongRunningPoller(context, _listLearnedRoutesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listLearnedRoutesSend(context, resourceGroupName, hubName, connectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<Record<string, PeerRoute[]>>, Record<string, PeerRoute[]>>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubBgpConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/bgpConnections{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVirtualHubBgpConnectionResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVirtualHubBgpConnectionResultsDeserializer(result.body);
}

/** Retrieves the details of all VirtualHubBgpConnections. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubBgpConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BgpConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, virtualHubName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}
