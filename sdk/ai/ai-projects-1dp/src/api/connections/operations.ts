// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  Connection,
  _PagedConnection,
  _pagedConnectionDeserializer,
} from "../../models/models.js";
import { ConnectionsListOptionalParams, ConnectionsGetWithCredentialsOptionalParams, ConnectionsGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
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
    "/connections{?api%2Dversion,connectionType,defaultConnection,top,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion,
      connectionType: options?.connectionType,
      defaultConnection: options?.defaultConnection,
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
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
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getWithCredentialsSend(
  context: Client,
  name: string,
  options: ConnectionsGetWithCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/connections/{name}/withCredentials{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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

  return __PLACEHOLDER_o18_sdeserializer__(result.body);
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
    "/connections/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
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

  return __PLACEHOLDER_o18_sdeserializer__(result.body);
}

/** Get a connection by name, without populating connection credentials */
export async function get(
  context: Client,
  name: string,
  options: ConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
