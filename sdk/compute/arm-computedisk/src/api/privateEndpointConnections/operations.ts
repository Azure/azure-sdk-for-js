// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams,
  PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams,
  PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams,
  PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateEndpointConnectionsSend(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  options: PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskAccessName: diskAccessName,
      "api%2Dversion": context.apiVersion,
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
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** List information about private endpoint connections under a disk access resource */
export function listPrivateEndpointConnections(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  options: PrivateEndpointConnectionsListPrivateEndpointConnectionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateEndpointConnectionsSend(context, resourceGroupName, diskAccessName, options),
    _listPrivateEndpointConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteAPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskAccessName: diskAccessName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a private endpoint connection under a disk access resource. */
export function deleteAPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteAPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteAPrivateEndpointConnectionDeserialize,
    ["200", "202", "204", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteAPrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          diskAccessName,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _updateAPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnection: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskAccessName: diskAccessName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(privateEndpointConnection),
  });
}

export async function _updateAPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
export function updateAPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnection: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsUpdateAPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _updateAPrivateEndpointConnectionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateAPrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          diskAccessName,
          privateEndpointConnectionName,
          privateEndpointConnection,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getAPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskAccessName: diskAccessName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
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

export async function _getAPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets information about a private endpoint connection under a disk access resource. */
export async function getAPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  diskAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetAPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnection> {
  const result = await _getAPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    diskAccessName,
    privateEndpointConnectionName,
    options,
  );
  return _getAPrivateEndpointConnectionDeserialize(result);
}
