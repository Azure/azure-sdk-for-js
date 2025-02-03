// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HealthDataAIServicesContext as Client,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsListByDeidServiceOptionalParams,
} from "../index.js";
import {
  PrivateEndpointConnectionResource,
  privateEndpointConnectionResourceSerializer,
  privateEndpointConnectionResourceDeserializer,
  _PrivateEndpointConnectionResourceListResult,
  _privateEndpointConnectionResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _privateEndpointConnectionsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
      privateEndpointConnectionName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return privateEndpointConnectionResourceDeserializer(result.body);
}

/** Get a specific private connection */
export async function privateEndpointConnectionsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionResource> {
  const result = await _privateEndpointConnectionsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    deidServiceName,
    privateEndpointConnectionName,
    options,
  );
  return _privateEndpointConnectionsGetDeserialize(result);
}

export function _privateEndpointConnectionsCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: PrivateEndpointConnectionsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
      privateEndpointConnectionName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: privateEndpointConnectionResourceSerializer(resource),
    });
}

export async function _privateEndpointConnectionsCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return privateEndpointConnectionResourceDeserializer(result.body);
}

/** Create a Private endpoint connection */
export function privateEndpointConnectionsCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: PrivateEndpointConnectionsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PrivateEndpointConnectionResource>,
  PrivateEndpointConnectionResource
> {
  return getLongRunningPoller(
    context,
    _privateEndpointConnectionsCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _privateEndpointConnectionsCreateSend(
          context,
          subscriptionId,
          resourceGroupName,
          deidServiceName,
          privateEndpointConnectionName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
}

export function _privateEndpointConnectionsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
      privateEndpointConnectionName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the private endpoint connection */
export function privateEndpointConnectionsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _privateEndpointConnectionsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _privateEndpointConnectionsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          deidServiceName,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _privateEndpointConnectionsListByDeidServiceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateEndpointConnectionsListByDeidServiceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsListByDeidServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _privateEndpointConnectionResourceListResultDeserializer(result.body);
}

/** List private endpoint connections on the given resource */
export function privateEndpointConnectionsListByDeidService(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateEndpointConnectionsListByDeidServiceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnectionResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _privateEndpointConnectionsListByDeidServiceSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
    _privateEndpointConnectionsListByDeidServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
