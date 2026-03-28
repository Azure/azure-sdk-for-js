// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  PrivateLinkService,
  PrivateEndpointConnection,
  CheckPrivateLinkServiceVisibilityRequest,
  PrivateLinkServiceVisibility,
  _AutoApprovedPrivateLinkServicesResult,
  AutoApprovedPrivateLinkService,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  privateLinkServiceSerializer,
  privateLinkServiceDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  errorDeserializer,
  checkPrivateLinkServiceVisibilityRequestSerializer,
  privateLinkServiceVisibilityDeserializer,
  _autoApprovedPrivateLinkServicesResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type {
  _PrivateLinkServiceListResult,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  _privateLinkServiceListResultDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams,
  PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams,
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
  PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams,
  PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
  PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams,
  PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams,
  PrivateLinkServicesListBySubscriptionOptionalParams,
  PrivateLinkServicesListOptionalParams,
  PrivateLinkServicesDeleteOptionalParams,
  PrivateLinkServicesCreateOrUpdateOptionalParams,
  PrivateLinkServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAutoApprovedPrivateLinkServicesByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/locations/{location}/autoApprovedPrivateLinkServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
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

export async function _listAutoApprovedPrivateLinkServicesByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutoApprovedPrivateLinkServicesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _autoApprovedPrivateLinkServicesResultDeserializer(result.body);
}

/** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
export function listAutoApprovedPrivateLinkServicesByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutoApprovedPrivateLinkService> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAutoApprovedPrivateLinkServicesByResourceGroupSend(
        context,
        resourceGroupName,
        location,
        options,
      ),
    _listAutoApprovedPrivateLinkServicesByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listAutoApprovedPrivateLinkServicesSend(
  context: Client,
  location: string,
  options: PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/autoApprovedPrivateLinkServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listAutoApprovedPrivateLinkServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutoApprovedPrivateLinkServicesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _autoApprovedPrivateLinkServicesResultDeserializer(result.body);
}

/** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
export function listAutoApprovedPrivateLinkServices(
  context: Client,
  location: string,
  options: PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutoApprovedPrivateLinkService> {
  return buildPagedAsyncIterator(
    context,
    () => _listAutoApprovedPrivateLinkServicesSend(context, location, options),
    _listAutoApprovedPrivateLinkServicesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _checkPrivateLinkServiceVisibilityByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CheckPrivateLinkServiceVisibilityRequest,
  options: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/locations/{location}/checkPrivateLinkServiceVisibility{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkPrivateLinkServiceVisibilityRequestSerializer(parameters),
  });
}

export async function _checkPrivateLinkServiceVisibilityByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkServiceVisibility> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return privateLinkServiceVisibilityDeserializer(result.body);
}

/** Checks whether the subscription is visible to private link service in the specified resource group. */
export function checkPrivateLinkServiceVisibilityByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CheckPrivateLinkServiceVisibilityRequest,
  options: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility> {
  return getLongRunningPoller(
    context,
    _checkPrivateLinkServiceVisibilityByResourceGroupDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _checkPrivateLinkServiceVisibilityByResourceGroupSend(
          context,
          resourceGroupName,
          location,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility>;
}

export function _checkPrivateLinkServiceVisibilitySend(
  context: Client,
  location: string,
  parameters: CheckPrivateLinkServiceVisibilityRequest,
  options: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/checkPrivateLinkServiceVisibility{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkPrivateLinkServiceVisibilityRequestSerializer(parameters),
  });
}

export async function _checkPrivateLinkServiceVisibilityDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkServiceVisibility> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return privateLinkServiceVisibilityDeserializer(result.body);
}

/** Checks whether the subscription is visible to private link service. */
export function checkPrivateLinkServiceVisibility(
  context: Client,
  location: string,
  parameters: CheckPrivateLinkServiceVisibilityRequest,
  options: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility> {
  return getLongRunningPoller(
    context,
    _checkPrivateLinkServiceVisibilityDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _checkPrivateLinkServiceVisibilitySend(context, location, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility>;
}

export function _listPrivateEndpointConnectionsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
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

export async function _listPrivateEndpointConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** Gets all private end point connections for a specific private link service. */
export function listPrivateEndpointConnections(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateEndpointConnectionsSend(context, resourceGroupName, serviceName, options),
    _listPrivateEndpointConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _deletePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  peConnectionName: string,
  options: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      peConnectionName: peConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete private end point connection for a private link service in a subscription. */
export function deletePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  peConnectionName: string,
  options: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          serviceName,
          peConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _updatePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  peConnectionName: string,
  parameters: PrivateEndpointConnection,
  options: PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      peConnectionName: peConnectionName,
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
    body: privateEndpointConnectionSerializer(parameters),
  });
}

export async function _updatePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Approve or reject private end point connection for a private link service in a subscription. */
export async function updatePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  peConnectionName: string,
  parameters: PrivateEndpointConnection,
  options: PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnection> {
  const result = await _updatePrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    serviceName,
    peConnectionName,
    parameters,
    options,
  );
  return _updatePrivateEndpointConnectionDeserialize(result);
}

export function _getPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  peConnectionName: string,
  options: PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      peConnectionName: peConnectionName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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

export async function _getPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Get the specific private end point connection by specific private link service in the resource group. */
export async function getPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  peConnectionName: string,
  options: PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    serviceName,
    peConnectionName,
    options,
  );
  return _getPrivateEndpointConnectionDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PrivateLinkServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/privateLinkServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _privateLinkServiceListResultDeserializer(result.body);
}

/** Gets all private link service in a subscription. */
export function listBySubscription(
  context: Client,
  options: PrivateLinkServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkService> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
): Promise<_PrivateLinkServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _privateLinkServiceListResultDeserializer(result.body);
}

/** Gets all private link services in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkService> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateLinkServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
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
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified private link service. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateLinkServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: PrivateLinkService,
  options: PrivateLinkServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
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
    body: privateLinkServiceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return privateLinkServiceDeserializer(result.body);
}

/** Creates or updates an private link service in the specified resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: PrivateLinkService,
  options: PrivateLinkServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateLinkService>, PrivateLinkService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, serviceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<PrivateLinkService>, PrivateLinkService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateLinkServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return privateLinkServiceDeserializer(result.body);
}

/** Gets the specified private link service by resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PrivateLinkServicesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkService> {
  const result = await _getSend(context, resourceGroupName, serviceName, options);
  return _getDeserialize(result);
}
