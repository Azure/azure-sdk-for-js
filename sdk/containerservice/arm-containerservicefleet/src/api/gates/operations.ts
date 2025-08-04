// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Gate,
  gateDeserializer,
  GatePatch,
  gatePatchSerializer,
  _GateListResult,
  _gateListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GatesListByFleetOptionalParams,
  GatesUpdateOptionalParams,
  GatesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByFleetSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: GatesListByFleetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/gates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByFleetDeserialize(
  result: PathUncheckedResponse,
): Promise<_GateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _gateListResultDeserializer(result.body);
}

/** List Gate resources by Fleet */
export function listByFleet(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: GatesListByFleetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Gate> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFleetSend(context, resourceGroupName, fleetName, options),
    _listByFleetDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  gateName: string,
  properties: GatePatch,
  options: GatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/gates/{gateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      gateName: gateName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: gatePatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Gate> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return gateDeserializer(result.body);
}

/** Update a Gate */
export function update(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  gateName: string,
  properties: GatePatch,
  options: GatesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Gate>, Gate> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, fleetName, gateName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Gate>, Gate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  gateName: string,
  options: GatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/gates/{gateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      gateName: gateName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Gate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return gateDeserializer(result.body);
}

/** Get a Gate */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  gateName: string,
  options: GatesGetOptionalParams = { requestOptions: {} },
): Promise<Gate> {
  const result = await _getSend(context, resourceGroupName, fleetName, gateName, options);
  return _getDeserialize(result);
}
