// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  GatewayHostnameBindingResource,
  _GatewayHostnameBindingListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  gatewayHostnameBindingResourceSerializer,
  gatewayHostnameBindingResourceDeserializer,
  _gatewayHostnameBindingListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ApiGatewayHostnameBindingListByGatewayOptionalParams,
  ApiGatewayHostnameBindingDeleteOptionalParams,
  ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ApiGatewayHostnameBindingGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshSecretSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  options: ApiGatewayHostnameBindingRefreshSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}/refreshSecret{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      hostnameBindingName: hostnameBindingName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshSecretDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Refresh the secret for an API Management gateway hostname binding. */
export function refreshSecret(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  options: ApiGatewayHostnameBindingRefreshSecretOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshSecretDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshSecretSend(context, resourceGroupName, gatewayName, hostnameBindingName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByGatewaySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: ApiGatewayHostnameBindingListByGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings{?api%2Dversion}",
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
): Promise<_GatewayHostnameBindingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gatewayHostnameBindingListResultDeserializer(result.body);
}

/** List all API Management gateway hostname bindings within a gateway. */
export function listByGateway(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: ApiGatewayHostnameBindingListByGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GatewayHostnameBindingResource> {
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
  hostnameBindingName: string,
  ifMatch: string,
  options: ApiGatewayHostnameBindingDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      hostnameBindingName: hostnameBindingName,
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

/** Deletes an existing API Management gateway hostname binding. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  ifMatch: string,
  options: ApiGatewayHostnameBindingDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, gatewayName, hostnameBindingName, ifMatch, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  parameters: GatewayHostnameBindingResource,
  options: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      hostnameBindingName: hostnameBindingName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: gatewayHostnameBindingResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayHostnameBindingResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayHostnameBindingResourceDeserializer(result.body);
}

/** Creates or updates an API Management gateway hostname binding. This is long running operation and could take several minutes to complete. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  parameters: GatewayHostnameBindingResource,
  options: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayHostnameBindingResource>, GatewayHostnameBindingResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<GatewayHostnameBindingResource>, GatewayHostnameBindingResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  options: ApiGatewayHostnameBindingGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      hostnameBindingName: hostnameBindingName,
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
): Promise<GatewayHostnameBindingResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayHostnameBindingResourceDeserializer(result.body);
}

/** Gets an API Management gateway hostname binding resource description. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  hostnameBindingName: string,
  options: ApiGatewayHostnameBindingGetOptionalParams = { requestOptions: {} },
): Promise<GatewayHostnameBindingResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    gatewayName,
    hostnameBindingName,
    options,
  );
  return _getDeserialize(result);
}
