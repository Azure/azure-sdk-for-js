// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/bookshelves/operations.js";
import {
  BookshelvesListBySubscriptionOptionalParams,
  BookshelvesListByResourceGroupOptionalParams,
  BookshelvesDeleteOptionalParams,
  BookshelvesUpdateOptionalParams,
  BookshelvesCreateOrUpdateOptionalParams,
  BookshelvesGetOptionalParams,
} from "../../api/bookshelves/options.js";
import { Bookshelf } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Bookshelves operations. */
export interface BookshelvesOperations {
  /** List Bookshelf resources by subscription ID */
  listBySubscription: (
    options?: BookshelvesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Bookshelf>;
  /** List Bookshelf resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BookshelvesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Bookshelf>;
  /** Delete a Bookshelf */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    bookshelfName: string,
    options?: BookshelvesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Bookshelf */
  update: (
    resourceGroupName: string,
    bookshelfName: string,
    properties: Bookshelf,
    options?: BookshelvesUpdateOptionalParams,
  ) => PollerLike<OperationState<Bookshelf>, Bookshelf>;
  /** Create a Bookshelf */
  createOrUpdate: (
    resourceGroupName: string,
    bookshelfName: string,
    resource: Bookshelf,
    options?: BookshelvesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Bookshelf>, Bookshelf>;
  /** Get a Bookshelf */
  get: (
    resourceGroupName: string,
    bookshelfName: string,
    options?: BookshelvesGetOptionalParams,
  ) => Promise<Bookshelf>;
}

function _getBookshelves(context: DiscoveryContext) {
  return {
    listBySubscription: (options?: BookshelvesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BookshelvesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      bookshelfName: string,
      options?: BookshelvesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, bookshelfName, options),
    update: (
      resourceGroupName: string,
      bookshelfName: string,
      properties: Bookshelf,
      options?: BookshelvesUpdateOptionalParams,
    ) => update(context, resourceGroupName, bookshelfName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      bookshelfName: string,
      resource: Bookshelf,
      options?: BookshelvesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, bookshelfName, resource, options),
    get: (
      resourceGroupName: string,
      bookshelfName: string,
      options?: BookshelvesGetOptionalParams,
    ) => get(context, resourceGroupName, bookshelfName, options),
  };
}

export function _getBookshelvesOperations(context: DiscoveryContext): BookshelvesOperations {
  return {
    ..._getBookshelves(context),
  };
}
