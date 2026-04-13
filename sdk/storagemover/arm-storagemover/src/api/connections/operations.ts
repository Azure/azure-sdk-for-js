// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageMoverContext as Client } from "../index.js";
import type { Connection, _ConnectionList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectionSerializer,
  connectionDeserializer,
  _connectionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionsDeleteOptionalParams,
  ConnectionsListOptionalParams,
  ConnectionsGetOptionalParams,
  ConnectionsCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  connectionName: string,
  options: ConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Deletes a Connection resource.
 * Returns 409 if there are active jobs using this connection.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  connectionName: string,
  options: ConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageMoverName, connectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectionListDeserializer(result.body);
}

/** Lists all Connections in a Storage Mover. */
export function list(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, storageMoverName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  connectionName: string,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Connection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Gets a Connection resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  connectionName: string,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageMoverName,
    connectionName,
    options,
  );
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  connectionName: string,
  connection: Connection,
  options: ConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionSerializer(connection),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Connection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Creates or updates a Connection resource. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  connectionName: string,
  connection: Connection,
  options: ConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    storageMoverName,
    connectionName,
    connection,
    options,
  );
  return _createOrUpdateDeserialize(result);
}
