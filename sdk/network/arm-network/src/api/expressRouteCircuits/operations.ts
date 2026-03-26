// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  ExpressRouteCircuit,
  ExpressRouteCircuitStats,
  ExpressRouteCircuitsArpTableListResult,
  ExpressRouteCircuitsRoutesTableListResult,
  ExpressRouteCircuitsRoutesTableSummaryListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  expressRouteCircuitSerializer,
  expressRouteCircuitDeserializer,
  expressRouteCircuitStatsDeserializer,
  expressRouteCircuitsArpTableListResultDeserializer,
  expressRouteCircuitsRoutesTableListResultDeserializer,
  expressRouteCircuitsRoutesTableSummaryListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ExpressRouteCircuitListResult } from "../../models/models.js";
import { _expressRouteCircuitListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteCircuitsGetPeeringStatsOptionalParams,
  ExpressRouteCircuitsListRoutesTableSummaryOptionalParams,
  ExpressRouteCircuitsListRoutesTableOptionalParams,
  ExpressRouteCircuitsListArpTableOptionalParams,
  ExpressRouteCircuitsGetStatsOptionalParams,
  ExpressRouteCircuitsListAllOptionalParams,
  ExpressRouteCircuitsListOptionalParams,
  ExpressRouteCircuitsDeleteOptionalParams,
  ExpressRouteCircuitsUpdateTagsOptionalParams,
  ExpressRouteCircuitsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getPeeringStatsSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  options: ExpressRouteCircuitsGetPeeringStatsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/stats{?api%2Dversion}",
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

export async function _getPeeringStatsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitStats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitStatsDeserializer(result.body);
}

/** Gets all stats from an express route circuit in a resource group. */
export async function getPeeringStats(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  options: ExpressRouteCircuitsGetPeeringStatsOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCircuitStats> {
  const result = await _getPeeringStatsSend(
    context,
    resourceGroupName,
    circuitName,
    peeringName,
    options,
  );
  return _getPeeringStatsDeserialize(result);
}

export function _listRoutesTableSummarySend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/routeTablesSummary/{devicePath}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
      devicePath: devicePath,
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

export async function _listRoutesTableSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitsRoutesTableSummaryListResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitsRoutesTableSummaryListResultDeserializer(result.body);
}

/** Gets the currently advertised routes table summary associated with the express route circuit in a resource group. */
export function listRoutesTableSummary(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCircuitsListRoutesTableSummaryOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteCircuitsRoutesTableSummaryListResult>,
  ExpressRouteCircuitsRoutesTableSummaryListResult
> {
  return getLongRunningPoller(context, _listRoutesTableSummaryDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listRoutesTableSummarySend(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ExpressRouteCircuitsRoutesTableSummaryListResult>,
    ExpressRouteCircuitsRoutesTableSummaryListResult
  >;
}

export function _listRoutesTableSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCircuitsListRoutesTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/routeTables/{devicePath}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
      devicePath: devicePath,
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

export async function _listRoutesTableDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitsRoutesTableListResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitsRoutesTableListResultDeserializer(result.body);
}

/** Gets the currently advertised routes table associated with the express route circuit in a resource group. */
export function listRoutesTable(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCircuitsListRoutesTableOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteCircuitsRoutesTableListResult>,
  ExpressRouteCircuitsRoutesTableListResult
> {
  return getLongRunningPoller(context, _listRoutesTableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listRoutesTableSend(
        context,
        resourceGroupName,
        circuitName,
        peeringName,
        devicePath,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ExpressRouteCircuitsRoutesTableListResult>,
    ExpressRouteCircuitsRoutesTableListResult
  >;
}

export function _listArpTableSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCircuitsListArpTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/arpTables/{devicePath}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      peeringName: peeringName,
      devicePath: devicePath,
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

export async function _listArpTableDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitsArpTableListResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitsArpTableListResultDeserializer(result.body);
}

/** Gets the currently advertised ARP table associated with the express route circuit in a resource group. */
export function listArpTable(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCircuitsListArpTableOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteCircuitsArpTableListResult>,
  ExpressRouteCircuitsArpTableListResult
> {
  return getLongRunningPoller(context, _listArpTableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listArpTableSend(context, resourceGroupName, circuitName, peeringName, devicePath, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ExpressRouteCircuitsArpTableListResult>,
    ExpressRouteCircuitsArpTableListResult
  >;
}

export function _getStatsSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitsGetStatsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/stats{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
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

export async function _getStatsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitStats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitStatsDeserializer(result.body);
}

/** Gets all the stats from an express route circuit in a resource group. */
export async function getStats(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitsGetStatsOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCircuitStats> {
  const result = await _getStatsSend(context, resourceGroupName, circuitName, options);
  return _getStatsDeserialize(result);
}

export function _listAllSend(
  context: Client,
  options: ExpressRouteCircuitsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteCircuits{?api%2Dversion}",
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
): Promise<_ExpressRouteCircuitListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _expressRouteCircuitListResultDeserializer(result.body);
}

/** Gets all the express route circuits in a subscription. */
export function listAll(
  context: Client,
  options: ExpressRouteCircuitsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCircuit> {
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
  options: ExpressRouteCircuitsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits{?api%2Dversion}",
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
): Promise<_ExpressRouteCircuitListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _expressRouteCircuitListResultDeserializer(result.body);
}

/** Gets all the express route circuits in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteCircuitsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCircuit> {
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
  circuitName: string,
  options: ExpressRouteCircuitsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
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

/** Deletes the specified express route circuit. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, circuitName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  parameters: TagsObject,
  options: ExpressRouteCircuitsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
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
): Promise<ExpressRouteCircuit> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitDeserializer(result.body);
}

/** Updates an express route circuit tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  parameters: TagsObject,
  options: ExpressRouteCircuitsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCircuit> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    circuitName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  parameters: ExpressRouteCircuit,
  options: ExpressRouteCircuitsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
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
    body: expressRouteCircuitSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuit> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitDeserializer(result.body);
}

/** Creates or updates an express route circuit. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  parameters: ExpressRouteCircuit,
  options: ExpressRouteCircuitsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteCircuit>, ExpressRouteCircuit> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, circuitName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ExpressRouteCircuit>, ExpressRouteCircuit>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExpressRouteCircuit> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitDeserializer(result.body);
}

/** Gets information about the specified express route circuit. */
export async function get(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCircuit> {
  const result = await _getSend(context, resourceGroupName, circuitName, options);
  return _getDeserialize(result);
}
