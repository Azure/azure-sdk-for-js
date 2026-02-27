// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext } from "../../api/discoveryContext.js";
import { listByBookshelf, get } from "../../api/bookshelfPrivateLinkResources/operations.js";
import {
  BookshelfPrivateLinkResourcesListByBookshelfOptionalParams,
  BookshelfPrivateLinkResourcesGetOptionalParams,
} from "../../api/bookshelfPrivateLinkResources/options.js";
import { BookshelfPrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BookshelfPrivateLinkResources operations. */
export interface BookshelfPrivateLinkResourcesOperations {
  /** Lists all private link resources for the bookshelf. */
  listByBookshelf: (
    resourceGroupName: string,
    bookshelfName: string,
    options?: BookshelfPrivateLinkResourcesListByBookshelfOptionalParams,
  ) => PagedAsyncIterableIterator<BookshelfPrivateLinkResource>;
  /** Gets the specified private link resource for the bookshelf. */
  get: (
    resourceGroupName: string,
    bookshelfName: string,
    privateLinkResourceName: string,
    options?: BookshelfPrivateLinkResourcesGetOptionalParams,
  ) => Promise<BookshelfPrivateLinkResource>;
}

function _getBookshelfPrivateLinkResources(context: DiscoveryContext) {
  return {
    listByBookshelf: (
      resourceGroupName: string,
      bookshelfName: string,
      options?: BookshelfPrivateLinkResourcesListByBookshelfOptionalParams,
    ) => listByBookshelf(context, resourceGroupName, bookshelfName, options),
    get: (
      resourceGroupName: string,
      bookshelfName: string,
      privateLinkResourceName: string,
      options?: BookshelfPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, bookshelfName, privateLinkResourceName, options),
  };
}

export function _getBookshelfPrivateLinkResourcesOperations(
  context: DiscoveryContext,
): BookshelfPrivateLinkResourcesOperations {
  return {
    ..._getBookshelfPrivateLinkResources(context),
  };
}
