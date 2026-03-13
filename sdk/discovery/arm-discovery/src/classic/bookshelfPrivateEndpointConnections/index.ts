// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listByBookshelf,
  $delete,
  createOrUpdate,
  get,
} from "../../api/bookshelfPrivateEndpointConnections/operations.js";
import type {
  BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams,
  BookshelfPrivateEndpointConnectionsDeleteOptionalParams,
  BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  BookshelfPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/bookshelfPrivateEndpointConnections/options.js";
import type { BookshelfPrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BookshelfPrivateEndpointConnections operations. */
export interface BookshelfPrivateEndpointConnectionsOperations {
  /** Lists all private endpoint connections for a bookshelf. */
  listByBookshelf: (
    resourceGroupName: string,
    bookshelfName: string,
    options?: BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams,
  ) => PagedAsyncIterableIterator<BookshelfPrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    bookshelfName: string,
    privateEndpointConnectionName: string,
    options?: BookshelfPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Approves or updates the specified private endpoint connection. */
  createOrUpdate: (
    resourceGroupName: string,
    bookshelfName: string,
    privateEndpointConnectionName: string,
    resource: BookshelfPrivateEndpointConnection,
    options?: BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<BookshelfPrivateEndpointConnection>,
    BookshelfPrivateEndpointConnection
  >;
  /** Gets the specified private endpoint connection associated with the bookshelf. */
  get: (
    resourceGroupName: string,
    bookshelfName: string,
    privateEndpointConnectionName: string,
    options?: BookshelfPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<BookshelfPrivateEndpointConnection>;
}

function _getBookshelfPrivateEndpointConnections(context: DiscoveryContext) {
  return {
    listByBookshelf: (
      resourceGroupName: string,
      bookshelfName: string,
      options?: BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams,
    ) => listByBookshelf(context, resourceGroupName, bookshelfName, options),
    delete: (
      resourceGroupName: string,
      bookshelfName: string,
      privateEndpointConnectionName: string,
      options?: BookshelfPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, bookshelfName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      bookshelfName: string,
      privateEndpointConnectionName: string,
      resource: BookshelfPrivateEndpointConnection,
      options?: BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        bookshelfName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      bookshelfName: string,
      privateEndpointConnectionName: string,
      options?: BookshelfPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, bookshelfName, privateEndpointConnectionName, options),
  };
}

export function _getBookshelfPrivateEndpointConnectionsOperations(
  context: DiscoveryContext,
): BookshelfPrivateEndpointConnectionsOperations {
  return {
    ..._getBookshelfPrivateEndpointConnections(context),
  };
}
