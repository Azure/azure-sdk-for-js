// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { FleetResource, _FleetListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  fleetResourceSerializer,
  fleetResourceDeserializer,
  fleetResourceUpdateSerializer,
  _fleetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FleetListOptionalParams,
  FleetListByResourceGroupOptionalParams,
  FleetDeleteOptionalParams,
  FleetUpdateOptionalParams,
  FleetCreateOptionalParams,
  FleetGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: FleetListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/fleets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_FleetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _fleetListResultDeserializer(result.body);
}

/** Lists all the fleets under the subscription. */
export function list(
  context: Client,
  options: FleetListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FleetResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: FleetListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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
): Promise<_FleetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _fleetListResultDeserializer(result.body);
}

/** Lists all the fleets under the specified subscription and resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: FleetListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FleetResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

/** Deletes an existing Azure Cosmos DB Fleet. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, fleetName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"] ? options["body"] : fleetResourceUpdateSerializer(options["body"]),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<FleetResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fleetResourceDeserializer(result.body);
}

/** Updates the properties of an existing Azure Cosmos DB Fleet. */
export async function update(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetUpdateOptionalParams = { requestOptions: {} },
): Promise<FleetResource> {
  const result = await _updateSend(context, resourceGroupName, fleetName, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  body: FleetResource,
  options: FleetCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fleetResourceSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<FleetResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fleetResourceDeserializer(result.body);
}

/** Creates an Azure Cosmos DB fleet under a subscription. */
export async function create(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  body: FleetResource,
  options: FleetCreateOptionalParams = { requestOptions: {} },
): Promise<FleetResource> {
  const result = await _createSend(context, resourceGroupName, fleetName, body, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FleetResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fleetResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB fleet under a subscription */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetGetOptionalParams = { requestOptions: {} },
): Promise<FleetResource> {
  const result = await _getSend(context, resourceGroupName, fleetName, options);
  return _getDeserialize(result);
}
