// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  Connection,
  connectionDeserializer,
  _PagedConnection,
  _pagedConnectionDeserializer,
  ConnectionType,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectionsListOptionalParams,
  ConnectionsGetWithCredentialsOptionalParams,
  ConnectionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/connections{?api-version,connectionType,defaultConnection}",
    {
      "api-version": context.apiVersion,
      connectionType: options?.connectionType,
      defaultConnection: options?.defaultConnection,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedConnectionDeserializer(result.body);
}

/** List all connections in the project, without populating connection credentials */
export function list(
  context: Client,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}

export function _getWithCredentialsSend(
  context: Client,
  name: string,
  options: ConnectionsGetWithCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/connections/{name}/getConnectionWithCredentials{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getWithCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<Connection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return connectionDeserializer(result.body);
}

/** Get a connection by name, with its connection credentials */
export async function getWithCredentials(
  context: Client,
  name: string,
  options: ConnectionsGetWithCredentialsOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _getWithCredentialsSend(context, name, options);
  return _getWithCredentialsDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/connections/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Connection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return connectionDeserializer(result.body);
}

/** Get a connection by name, without populating connection credentials */
export async function get(
  context: Client,
  name: string,
  includeCredentials?: boolean,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  if (includeCredentials) {
    return getWithCredentials(context, name, options);
  }
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}

/**
 * Get the default connection for a given connection type.
 *
 * @param context - The AIProjectContext client
 * @param connectionType - The type of the connection. Required.
 * @param includeCredentials - Whether to include credentials in the response. Default is false.
 * @returns A Connection object
 * @throws Error if no default connection is found for the given type.
 */
export async function getDefault(
  context: Client,
  connectionType: ConnectionType,
  includeCredentials: boolean = false,
): Promise<Connection> {
  const listOptions = {
    connectionType,
    defaultConnection: true,
  };

  // Use the list function to find default connections of the specified type
  const connections = list(context, listOptions);

  // Find the first default connection
  for await (const connection of connections) {
    if (includeCredentials) {
      // If credentials are requested, get the connection with credentials
      return getWithCredentials(context, connection.name);
    }
    return connection;
  }

  throw new Error(`No default connection found for type: ${connectionType}.`);
}
