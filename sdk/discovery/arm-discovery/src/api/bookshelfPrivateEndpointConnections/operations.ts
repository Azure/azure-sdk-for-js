// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BookshelfPrivateEndpointConnection,
  bookshelfPrivateEndpointConnectionSerializer,
  bookshelfPrivateEndpointConnectionDeserializer,
  _BookshelfPrivateEndpointConnectionListResult,
  _bookshelfPrivateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams,
  BookshelfPrivateEndpointConnectionsDeleteOptionalParams,
  BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  BookshelfPrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByBookshelfSend(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  options: BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/bookshelves/{bookshelfName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bookshelfName: bookshelfName,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByBookshelfDeserialize(
  result: PathUncheckedResponse,
): Promise<_BookshelfPrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _bookshelfPrivateEndpointConnectionListResultDeserializer(result.body);
}

/** Lists all private endpoint connections for a bookshelf. */
export function listByBookshelf(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  options: BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BookshelfPrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBookshelfSend(context, resourceGroupName, bookshelfName, options),
    _listByBookshelfDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateEndpointConnectionName: string,
  options: BookshelfPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/bookshelves/{bookshelfName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bookshelfName: bookshelfName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes the specified private endpoint connection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateEndpointConnectionName: string,
  options: BookshelfPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        bookshelfName,
        privateEndpointConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateEndpointConnectionName: string,
  resource: BookshelfPrivateEndpointConnection,
  options: BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/bookshelves/{bookshelfName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bookshelfName: bookshelfName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: bookshelfPrivateEndpointConnectionSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BookshelfPrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bookshelfPrivateEndpointConnectionDeserializer(result.body);
}

/** Approves or updates the specified private endpoint connection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateEndpointConnectionName: string,
  resource: BookshelfPrivateEndpointConnection,
  options: BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<BookshelfPrivateEndpointConnection>,
  BookshelfPrivateEndpointConnection
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        bookshelfName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<BookshelfPrivateEndpointConnection>,
    BookshelfPrivateEndpointConnection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateEndpointConnectionName: string,
  options: BookshelfPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/bookshelves/{bookshelfName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bookshelfName: bookshelfName,
      privateEndpointConnectionName: privateEndpointConnectionName,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BookshelfPrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bookshelfPrivateEndpointConnectionDeserializer(result.body);
}

/** Gets the specified private endpoint connection associated with the bookshelf. */
export async function get(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateEndpointConnectionName: string,
  options: BookshelfPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<BookshelfPrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    bookshelfName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
