// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Fleet,
  fleetSerializer,
  fleetDeserializer,
  FleetPatch,
  fleetPatchSerializer,
  _FleetListResult,
  _fleetListResultDeserializer,
  FleetCredentialResults,
  fleetCredentialResultsDeserializer,
} from "../../models/models.js";
import {
  FleetsListCredentialsOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsUpdateAsyncOptionalParams,
  FleetsCreateOptionalParams,
  FleetsGetOptionalParams,
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

export function _listCredentialsSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsListCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/listCredentials{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<FleetCredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetCredentialResultsDeserializer(result.body);
}

/** Lists the user credentials of a Fleet. */
export async function listCredentials(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsListCredentialsOptionalParams = { requestOptions: {} },
): Promise<FleetCredentialResults> {
  const result = await _listCredentialsSend(context, resourceGroupName, fleetName, options);
  return _listCredentialsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/fleets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
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

/** Lists fleets in the specified subscription. */
export function listBySubscription(
  context: Client,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

/** Lists fleets in the specified subscription and resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}{?api%2Dversion}",
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

/** Delete a Fleet */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, fleetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateAsyncSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetPatch,
  options: FleetsUpdateAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: fleetPatchSerializer(properties),
  });
}

export async function _updateAsyncDeserialize(result: PathUncheckedResponse): Promise<Fleet> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetDeserializer(result.body);
}

/** Update a Fleet */
export function updateAsync(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetPatch,
  options: FleetsUpdateAsyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _updateAsyncDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateAsyncSend(context, resourceGroupName, fleetName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: fleetSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Fleet> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetDeserializer(result.body);
}

/** Creates or updates a Fleet. */
export function create(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceGroupName, fleetName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Fleet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetDeserializer(result.body);
}

/** Gets a Fleet. */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): Promise<Fleet> {
  const result = await _getSend(context, resourceGroupName, fleetName, options);
  return _getDeserialize(result);
}
