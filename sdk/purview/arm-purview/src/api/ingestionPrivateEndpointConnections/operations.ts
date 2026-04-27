// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionList,
  PrivateEndpointConnectionStatusUpdateRequest,
  PrivateEndpointConnectionStatusUpdateResponse,
} from "../../models/models.js";
import {
  errorResponseModelDeserializer,
  _privateEndpointConnectionListDeserializer,
  privateEndpointConnectionStatusUpdateRequestSerializer,
  privateEndpointConnectionStatusUpdateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams,
  IngestionPrivateEndpointConnectionsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateStatusSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  request: PrivateEndpointConnectionStatusUpdateRequest,
  options: IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/ingestionPrivateEndpointConnectionStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionStatusUpdateRequestSerializer(request),
  });
}

export async function _updateStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionStatusUpdateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionStatusUpdateResponseDeserializer(result.body);
}

/** Update ingestion private endpoint connection status */
export async function updateStatus(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  request: PrivateEndpointConnectionStatusUpdateRequest,
  options: IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionStatusUpdateResponse> {
  const result = await _updateStatusSend(context, resourceGroupName, accountName, request, options);
  return _updateStatusDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: IngestionPrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/ingestionPrivateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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
): Promise<_PrivateEndpointConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListDeserializer(result.body);
}

/** Lists all ingestion private endpoint connections */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: IngestionPrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}
