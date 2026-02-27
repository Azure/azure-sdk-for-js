// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BookshelfPrivateLinkResource,
  bookshelfPrivateLinkResourceDeserializer,
  _BookshelfPrivateLinkResourceListResult,
  _bookshelfPrivateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BookshelfPrivateLinkResourcesListByBookshelfOptionalParams,
  BookshelfPrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByBookshelfSend(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  options: BookshelfPrivateLinkResourcesListByBookshelfOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/bookshelves/{bookshelfName}/privateLinkResources{?api%2Dversion}",
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
): Promise<_BookshelfPrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _bookshelfPrivateLinkResourceListResultDeserializer(result.body);
}

/** Lists all private link resources for the bookshelf. */
export function listByBookshelf(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  options: BookshelfPrivateLinkResourcesListByBookshelfOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BookshelfPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBookshelfSend(context, resourceGroupName, bookshelfName, options),
    _listByBookshelfDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateLinkResourceName: string,
  options: BookshelfPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/bookshelves/{bookshelfName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bookshelfName: bookshelfName,
      privateLinkResourceName: privateLinkResourceName,
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
): Promise<BookshelfPrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return bookshelfPrivateLinkResourceDeserializer(result.body);
}

/** Gets the specified private link resource for the bookshelf. */
export async function get(
  context: Client,
  resourceGroupName: string,
  bookshelfName: string,
  privateLinkResourceName: string,
  options: BookshelfPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<BookshelfPrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    bookshelfName,
    privateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
