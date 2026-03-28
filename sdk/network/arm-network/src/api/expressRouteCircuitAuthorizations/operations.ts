// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  ExpressRouteCircuitAuthorization,
  _AuthorizationListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  expressRouteCircuitAuthorizationSerializer,
  expressRouteCircuitAuthorizationDeserializer,
  _authorizationListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteCircuitAuthorizationsListOptionalParams,
  ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
  ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitAuthorizationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitAuthorizationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AuthorizationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _authorizationListResultDeserializer(result.body);
}

/** Gets all authorizations in an express route circuit. */
export function list(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  options: ExpressRouteCircuitAuthorizationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCircuitAuthorization> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, circuitName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  authorizationName: string,
  options: ExpressRouteCircuitAuthorizationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      authorizationName: authorizationName,
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

/** Deletes the specified authorization from the specified express route circuit. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  authorizationName: string,
  options: ExpressRouteCircuitAuthorizationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, circuitName, authorizationName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  authorizationName: string,
  authorizationParameters: ExpressRouteCircuitAuthorization,
  options: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      authorizationName: authorizationName,
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
    body: expressRouteCircuitAuthorizationSerializer(authorizationParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitAuthorization> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitAuthorizationDeserializer(result.body);
}

/** Creates or updates an authorization in the specified express route circuit. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  authorizationName: string,
  authorizationParameters: ExpressRouteCircuitAuthorization,
  options: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteCircuitAuthorization>, ExpressRouteCircuitAuthorization> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        circuitName,
        authorizationName,
        authorizationParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ExpressRouteCircuitAuthorization>,
    ExpressRouteCircuitAuthorization
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  authorizationName: string,
  options: ExpressRouteCircuitAuthorizationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      circuitName: circuitName,
      authorizationName: authorizationName,
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
): Promise<ExpressRouteCircuitAuthorization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCircuitAuthorizationDeserializer(result.body);
}

/** Gets the specified authorization from the specified express route circuit. */
export async function get(
  context: Client,
  resourceGroupName: string,
  circuitName: string,
  authorizationName: string,
  options: ExpressRouteCircuitAuthorizationsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCircuitAuthorization> {
  const result = await _getSend(
    context,
    resourceGroupName,
    circuitName,
    authorizationName,
    options,
  );
  return _getDeserialize(result);
}
