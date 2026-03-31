// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext as Client } from "../index.js";
import type {
  FrontendEndpoint,
  CustomHttpsConfiguration,
  _FrontendEndpointsListResult,
} from "../../models/models.js";
import {
  frontendEndpointDeserializer,
  customHttpsConfigurationSerializer,
  errorResponseDeserializer,
  _frontendEndpointsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FrontendEndpointsDisableHttpsOptionalParams,
  FrontendEndpointsEnableHttpsOptionalParams,
  FrontendEndpointsListByFrontDoorOptionalParams,
  FrontendEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _disableHttpsSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontendEndpointName: string,
  options: FrontendEndpointsDisableHttpsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints/{frontendEndpointName}/disableHttps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      frontendEndpointName: frontendEndpointName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableHttpsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables a frontendEndpoint for HTTPS traffic */
export function disableHttps(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontendEndpointName: string,
  options: FrontendEndpointsDisableHttpsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _disableHttpsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableHttpsSend(context, resourceGroupName, frontDoorName, frontendEndpointName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _enableHttpsSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontendEndpointName: string,
  customHttpsConfiguration: CustomHttpsConfiguration,
  options: FrontendEndpointsEnableHttpsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints/{frontendEndpointName}/enableHttps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      frontendEndpointName: frontendEndpointName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: customHttpsConfigurationSerializer(customHttpsConfiguration),
  });
}

export async function _enableHttpsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables a frontendEndpoint for HTTPS traffic */
export function enableHttps(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontendEndpointName: string,
  customHttpsConfiguration: CustomHttpsConfiguration,
  options: FrontendEndpointsEnableHttpsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _enableHttpsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableHttpsSend(
        context,
        resourceGroupName,
        frontDoorName,
        frontendEndpointName,
        customHttpsConfiguration,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByFrontDoorSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: FrontendEndpointsListByFrontDoorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _listByFrontDoorDeserialize(
  result: PathUncheckedResponse,
): Promise<_FrontendEndpointsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _frontendEndpointsListResultDeserializer(result.body);
}

/** Lists all of the frontend endpoints within a Front Door. */
export function listByFrontDoor(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: FrontendEndpointsListByFrontDoorOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FrontendEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFrontDoorSend(context, resourceGroupName, frontDoorName, options),
    _listByFrontDoorDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontendEndpointName: string,
  options: FrontendEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints/{frontendEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      frontendEndpointName: frontendEndpointName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FrontendEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return frontendEndpointDeserializer(result.body);
}

/** Gets a Frontend endpoint with the specified name within the specified Front Door. */
export async function get(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontendEndpointName: string,
  options: FrontendEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<FrontendEndpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    frontDoorName,
    frontendEndpointName,
    options,
  );
  return _getDeserialize(result);
}
