// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  PrivateEndpointConnectionResource,
  _PrivateEndpointConnectionResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateEndpointConnectionResourceSerializer,
  privateEndpointConnectionResourceDeserializer,
  _privateEndpointConnectionResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams,
  HorizonDbPrivateEndpointConnectionsListOptionalParams,
  HorizonDbPrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  privateEndpointConnectionName: string,
  options: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

/** Deletes a private endpoint connection. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  privateEndpointConnectionName: string,
  options: HorizonDbPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, privateEndpointConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionResourceSerializer(resource),
  });
}

export async function _updateStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionResourceDeserializer(result.body);
}

/** Approves or rejects a private endpoint connection. */
export async function updateStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionResource> {
  const result = await _updateStatusSend(
    context,
    resourceGroupName,
    clusterName,
    privateEndpointConnectionName,
    resource,
    options,
  );
  return _updateStatusDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: HorizonDbPrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<_PrivateEndpointConnectionResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateEndpointConnectionResourceListResultDeserializer(result.body);
}

/** Lists private endpoint connections in a HorizonDB cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: HorizonDbPrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnectionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  privateEndpointConnectionName: string,
  options: HorizonDbPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<PrivateEndpointConnectionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionResourceDeserializer(result.body);
}

/** Gets a private endpoint connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  privateEndpointConnectionName: string,
  options: HorizonDbPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
