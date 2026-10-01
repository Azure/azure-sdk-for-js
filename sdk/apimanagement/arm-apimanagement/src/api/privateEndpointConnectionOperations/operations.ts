// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  PrivateEndpointConnectionRequest,
  _PrivateEndpointConnectionListResult,
  PrivateLinkResource,
  PrivateLinkResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateEndpointConnectionDeserializer,
  privateEndpointConnectionRequestSerializer,
  _privateEndpointConnectionListResultDeserializer,
  privateLinkResourceDeserializer,
  privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams,
  PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams,
  PrivateEndpointConnectionOperationsListByServiceOptionalParams,
  PrivateEndpointConnectionOperationsDeleteOptionalParams,
  PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionOperationsGetByNameOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _listPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources */
export async function listPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateLinkResourceListResult> {
  const result = await _listPrivateLinkResourcesSend(
    context,
    resourceGroupName,
    serviceName,
    options,
  );
  return _listPrivateLinkResourcesDeserialize(result);
}

export function _getPrivateLinkResourceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateLinkSubResourceName: string,
  options: PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateLinkResources/{privateLinkSubResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      privateLinkSubResourceName: privateLinkSubResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _getPrivateLinkResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets the private link resources */
export async function getPrivateLinkResource(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateLinkSubResourceName: string,
  options: PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateLinkResource> {
  const result = await _getPrivateLinkResourceSend(
    context,
    resourceGroupName,
    serviceName,
    privateLinkSubResourceName,
    options,
  );
  return _getPrivateLinkResourceDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateEndpointConnectionOperationsListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** Lists all private endpoint connections of the API Management service instance. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateEndpointConnectionOperationsListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

/** Deletes the specified Private Endpoint Connection. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionOperationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serviceName, privateEndpointConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
  options: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionRequestSerializer(privateEndpointConnectionRequest),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Creates a new Private Endpoint Connection or updates an existing one. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
  options: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        privateEndpointConnectionRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getByNameSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionOperationsGetByNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _getByNameDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets the details of the Private Endpoint Connection specified by its identifier. */
export async function getByName(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionOperationsGetByNameOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getByNameSend(
    context,
    resourceGroupName,
    serviceName,
    privateEndpointConnectionName,
    options,
  );
  return _getByNameDeserialize(result);
}
