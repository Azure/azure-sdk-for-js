// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ExpressRouteCircuitConnection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  expressRouteCircuitConnectionSerializer,
  expressRouteCircuitConnectionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ExpressRouteCircuitConnectionListResult } from "../../models/models.js";
import { _expressRouteCircuitConnectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteCircuitConnectionsListOptionalParams,
  ExpressRouteCircuitConnectionsDeleteOptionalParams,
  ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  options: ExpressRouteCircuitConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
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
): Promise<_ExpressRouteCircuitConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _expressRouteCircuitConnectionListResultDeserializer(result.body);
}

/** Gets all global reach connections associated with a private peering in an express route circuit. */
export function list(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  options: ExpressRouteCircuitConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCircuitConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, circuitName, peeringName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  options: ExpressRouteCircuitConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
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

/** Deletes the specified Express Route Circuit Connection from the specified express route circuit. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  options: ExpressRouteCircuitConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, circuitName, peeringName, connectionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
  options: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
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
    body: expressRouteCircuitConnectionSerializer(expressRouteCircuitConnectionParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitConnectionDeserializer(result.body);
}

/** Creates or updates a Express Route Circuit Connection in the specified express route circuits. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection,
  options: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteCircuitConnection>, ExpressRouteCircuitConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        connectionName,
        expressRouteCircuitConnectionParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ExpressRouteCircuitConnection>, ExpressRouteCircuitConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  options: ExpressRouteCircuitConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
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
): Promise<ExpressRouteCircuitConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitConnectionDeserializer(result.body);
}

/** Gets the specified Express Route Circuit Connection from the specified express route circuit. */
export async function get(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  connectionName: string,
  options: ExpressRouteCircuitConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCircuitConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    circuitName,
    peeringName,
    connectionName,
    options,
  );
  return _getDeserialize(result);
}
