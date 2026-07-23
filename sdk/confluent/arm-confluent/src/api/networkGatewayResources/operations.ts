// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext as Client } from "../index.js";
import type {
  NetworkGatewayResource,
  _NetworkGatewayResourceListResult,
} from "../../models/models.js";
import {
  networkGatewayResourceSerializer,
  networkGatewayResourceDeserializer,
  errorResponseDeserializer,
  _networkGatewayResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkGatewayResourcesListOptionalParams,
  NetworkGatewayResourcesDeleteOptionalParams,
  NetworkGatewayResourcesCreateOrReplaceOptionalParams,
  NetworkGatewayResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: NetworkGatewayResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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
): Promise<_NetworkGatewayResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _networkGatewayResourceListResultDeserializer(result.body);
}
/** Lists all network gateways in an environment */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: NetworkGatewayResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkGatewayResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, organizationName, environmentId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  options: NetworkGatewayResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Delete confluent network gateway by id */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  options: NetworkGatewayResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  resource: NetworkGatewayResource,
  options: NetworkGatewayResourcesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkGatewayResourceSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkGatewayResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return networkGatewayResourceDeserializer(result.body);
}
/** Create or replace a confluent network gateway */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  resource: NetworkGatewayResource,
  options: NetworkGatewayResourcesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkGatewayResource>, NetworkGatewayResource> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-02-preview",
  }) as PollerLike<OperationState<NetworkGatewayResource>, NetworkGatewayResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  options: NetworkGatewayResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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
): Promise<NetworkGatewayResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return networkGatewayResourceDeserializer(result.body);
}
/** Get confluent network gateway by Id */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  options: NetworkGatewayResourcesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkGatewayResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    networkGatewayId,
    options,
  );
  return _getDeserialize(result);
}
