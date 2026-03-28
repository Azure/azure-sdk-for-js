// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/bookmarks/operations.js";
import type {
  BookmarksListOptionalParams,
  BookmarksDeleteOptionalParams,
  BookmarksCreateOrUpdateOptionalParams,
  BookmarksGetOptionalParams,
} from "../../api/bookmarks/options.js";
import type { Bookmark } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Bookmarks operations. */
export interface BookmarksOperations {
  /** Gets all bookmarks. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: BookmarksListOptionalParams,
  ) => PagedAsyncIterableIterator<Bookmark>;
  /** Delete the bookmark. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    options?: BookmarksDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the bookmark. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    bookmark: Bookmark,
    options?: BookmarksCreateOrUpdateOptionalParams,
  ) => Promise<Bookmark>;
  /** Gets a bookmark. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    options?: BookmarksGetOptionalParams,
  ) => Promise<Bookmark>;
}

function _getBookmarks(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: BookmarksListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      options?: BookmarksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, bookmarkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      bookmark: Bookmark,
      options?: BookmarksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, bookmarkId, bookmark, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      options?: BookmarksGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, bookmarkId, options),
  };
}

export function _getBookmarksOperations(context: SecurityInsightsContext): BookmarksOperations {
  return {
    ..._getBookmarks(context),
  };
}
