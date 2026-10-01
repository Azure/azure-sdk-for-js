// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type { Route, RouteUpdateParameters, _RouteListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  routeSerializer,
  routeDeserializer,
  routeUpdateParametersSerializer,
  _routeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoutesListByEndpointOptionalParams,
  RoutesDeleteOptionalParams,
  RoutesUpdateOptionalParams,
  RoutesCreateOptionalParams,
  RoutesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByEndpointSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: RoutesListByEndpointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listByEndpointDeserialize(
  result: PathUncheckedResponse,
): Promise<_RouteListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _routeListResultDeserializer(result.body);
}

/** Lists all of the existing origins within a profile. */
export function listByEndpoint(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: RoutesListByEndpointOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Route> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEndpointSend(context, resourceGroupName, profileName, endpointName, options),
    _listByEndpointDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  options: RoutesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  options: RoutesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, endpointName, routeName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  routeUpdateProperties: RouteUpdateParameters,
  options: RoutesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: routeUpdateParametersSerializer(routeUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Route> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routeDeserializer(result.body);
}

/** Updates an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  routeUpdateProperties: RouteUpdateParameters,
  options: RoutesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Route>, Route> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        routeName,
        routeUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Route>, Route>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  route: Route,
  options: RoutesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: routeSerializer(route),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Route> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routeDeserializer(result.body);
}

/** Creates a new route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  route: Route,
  options: RoutesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Route>, Route> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, endpointName, routeName, route, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Route>, Route>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  options: RoutesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Route> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routeDeserializer(result.body);
}

/** Gets an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  routeName: string,
  options: RoutesGetOptionalParams = { requestOptions: {} },
): Promise<Route> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    endpointName,
    routeName,
    options,
  );
  return _getDeserialize(result);
}
