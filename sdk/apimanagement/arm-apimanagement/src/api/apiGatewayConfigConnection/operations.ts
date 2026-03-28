// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  ApiManagementGatewayConfigConnectionResource,
  _ApiManagementGatewayConfigConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  apiManagementGatewayConfigConnectionResourceSerializer,
  apiManagementGatewayConfigConnectionResourceDeserializer,
  _apiManagementGatewayConfigConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApiGatewayConfigConnectionListByGatewayOptionalParams,
  ApiGatewayConfigConnectionDeleteOptionalParams,
  ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
  ApiGatewayConfigConnectionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByGatewaySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: ApiGatewayConfigConnectionListByGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/configConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApiManagementGatewayConfigConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _apiManagementGatewayConfigConnectionListResultDeserializer(result.body);
}

/** List all API Management gateway config connections within a gateway. */
export function listByGateway(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: ApiGatewayConfigConnectionListByGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiManagementGatewayConfigConnectionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByGatewaySend(context, resourceGroupName, gatewayName, options),
    _listByGatewayDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  configConnectionName: string,
  ifMatch: string,
  options: ApiGatewayConfigConnectionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/configConnections/{configConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      configConnectionName: configConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes an existing API Management gateway config connection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  configConnectionName: string,
  ifMatch: string,
  options: ApiGatewayConfigConnectionDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, gatewayName, configConnectionName, ifMatch, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  configConnectionName: string,
  parameters: ApiManagementGatewayConfigConnectionResource,
  options: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/configConnections/{configConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      configConnectionName: configConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiManagementGatewayConfigConnectionResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementGatewayConfigConnectionResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementGatewayConfigConnectionResourceDeserializer(result.body);
}

/** Creates or updates an API Management gateway config connection. This is long running operation and could take several minutes to complete. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  configConnectionName: string,
  parameters: ApiManagementGatewayConfigConnectionResource,
  options: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ApiManagementGatewayConfigConnectionResource>,
  ApiManagementGatewayConfigConnectionResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        gatewayName,
        configConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<
    OperationState<ApiManagementGatewayConfigConnectionResource>,
    ApiManagementGatewayConfigConnectionResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  configConnectionName: string,
  options: ApiGatewayConfigConnectionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/configConnections/{configConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      configConnectionName: configConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<ApiManagementGatewayConfigConnectionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementGatewayConfigConnectionResourceDeserializer(result.body);
}

/** Gets an API Management gateway config connection resource description. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  configConnectionName: string,
  options: ApiGatewayConfigConnectionGetOptionalParams = { requestOptions: {} },
): Promise<ApiManagementGatewayConfigConnectionResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    gatewayName,
    configConnectionName,
    options,
  );
  return _getDeserialize(result);
}
