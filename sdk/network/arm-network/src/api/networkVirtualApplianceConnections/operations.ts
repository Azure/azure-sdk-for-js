// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  NetworkVirtualApplianceConnection,
  _NetworkVirtualApplianceConnectionList,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkVirtualApplianceConnectionSerializer,
  networkVirtualApplianceConnectionDeserializer,
  _networkVirtualApplianceConnectionListDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkVirtualApplianceConnectionsListOptionalParams,
  NetworkVirtualApplianceConnectionsDeleteOptionalParams,
  NetworkVirtualApplianceConnectionsGetOptionalParams,
  NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualApplianceConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/networkVirtualApplianceConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
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
): Promise<_NetworkVirtualApplianceConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkVirtualApplianceConnectionListDeserializer(result.body);
}

/** Lists NetworkVirtualApplianceConnections under the NVA. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualApplianceConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkVirtualApplianceConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkVirtualApplianceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  connectionName: string,
  options: NetworkVirtualApplianceConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/networkVirtualApplianceConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      connectionName: connectionName,
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

/** Deletes a NVA connection. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  connectionName: string,
  options: NetworkVirtualApplianceConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  connectionName: string,
  options: NetworkVirtualApplianceConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/networkVirtualApplianceConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      connectionName: connectionName,
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
): Promise<NetworkVirtualApplianceConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceConnectionDeserializer(result.body);
}

/** Retrieves the details of specified NVA connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  connectionName: string,
  options: NetworkVirtualApplianceConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkVirtualApplianceConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkVirtualApplianceName,
    connectionName,
    options,
  );
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  connectionName: string,
  networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
  options: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/networkVirtualApplianceConnections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      connectionName: connectionName,
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
    body: networkVirtualApplianceConnectionSerializer(networkVirtualApplianceConnectionParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkVirtualApplianceConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceConnectionDeserializer(result.body);
}

/** Creates a connection to Network Virtual Appliance, if it doesn't exist else updates the existing NVA connection' */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  connectionName: string,
  networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection,
  options: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkVirtualApplianceConnection>,
  NetworkVirtualApplianceConnection
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        connectionName,
        networkVirtualApplianceConnectionParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<NetworkVirtualApplianceConnection>,
    NetworkVirtualApplianceConnection
  >;
}
