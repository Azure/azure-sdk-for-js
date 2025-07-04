// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FleetMember,
  fleetMemberSerializer,
  fleetMemberDeserializer,
  FleetMemberUpdate,
  fleetMemberUpdateSerializer,
  _FleetMemberListResult,
  _fleetMemberListResultDeserializer,
} from "../../models/models.js";
import {
  FleetMembersListByFleetOptionalParams,
  FleetMembersDeleteOptionalParams,
  FleetMembersUpdateAsyncOptionalParams,
  FleetMembersCreateOptionalParams,
  FleetMembersGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
  options: FleetMembersListByFleetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members{?api%2Dversion}",
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
): Promise<_FleetMemberListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _fleetMemberListResultDeserializer(result.body);
}

/** List FleetMember resources by Fleet */
export function listByFleet(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetMembersListByFleetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FleetMember> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFleetSend(context, resourceGroupName, fleetName, options),
    _listByFleetDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  options: FleetMembersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetMemberName: fleetMemberName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a FleetMember */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  options: FleetMembersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, fleetName, fleetMemberName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateAsyncSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  properties: FleetMemberUpdate,
  options: FleetMembersUpdateAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetMemberName: fleetMemberName,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: fleetMemberUpdateSerializer(properties),
  });
}

export async function _updateAsyncDeserialize(result: PathUncheckedResponse): Promise<FleetMember> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetMemberDeserializer(result.body);
}

/** Update a FleetMember */
export function updateAsync(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  properties: FleetMemberUpdate,
  options: FleetMembersUpdateAsyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FleetMember>, FleetMember> {
  return getLongRunningPoller(context, _updateAsyncDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateAsyncSend(context, resourceGroupName, fleetName, fleetMemberName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FleetMember>, FleetMember>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  resource: FleetMember,
  options: FleetMembersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetMemberName: fleetMemberName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: fleetMemberSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<FleetMember> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetMemberDeserializer(result.body);
}

/** Create a FleetMember */
export function create(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  resource: FleetMember,
  options: FleetMembersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FleetMember>, FleetMember> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, fleetName, fleetMemberName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FleetMember>, FleetMember>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  options: FleetMembersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetMemberName: fleetMemberName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FleetMember> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetMemberDeserializer(result.body);
}

/** Get a FleetMember */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetMemberName: string,
  options: FleetMembersGetOptionalParams = { requestOptions: {} },
): Promise<FleetMember> {
  const result = await _getSend(context, resourceGroupName, fleetName, fleetMemberName, options);
  return _getDeserialize(result);
}
