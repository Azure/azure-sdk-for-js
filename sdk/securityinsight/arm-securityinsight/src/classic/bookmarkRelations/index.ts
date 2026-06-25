// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/bookmarkRelations/operations.js";
import {
  BookmarkRelationsListOptionalParams,
  BookmarkRelationsDeleteOptionalParams,
  BookmarkRelationsCreateOrUpdateOptionalParams,
  BookmarkRelationsGetOptionalParams,
} from "../../api/bookmarkRelations/options.js";
import { Relation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BookmarkRelations operations. */
export interface BookmarkRelationsOperations {
  /** Gets all bookmark relations. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    options?: BookmarkRelationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Relation>;
  /** Delete the bookmark relation. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    relationName: string,
    options?: BookmarkRelationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates the bookmark relation. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    relationName: string,
    relation: Relation,
    options?: BookmarkRelationsCreateOrUpdateOptionalParams,
  ) => Promise<Relation>;
  /** Gets a bookmark relation. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    relationName: string,
    options?: BookmarkRelationsGetOptionalParams,
  ) => Promise<Relation>;
}

function _getBookmarkRelations(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      options?: BookmarkRelationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, bookmarkId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      relationName: string,
      options?: BookmarkRelationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, bookmarkId, relationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      relationName: string,
      relation: Relation,
      options?: BookmarkRelationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        bookmarkId,
        relationName,
        relation,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      relationName: string,
      options?: BookmarkRelationsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, bookmarkId, relationName, options),
  };
}

export function _getBookmarkRelationsOperations(
  context: SecurityInsightsContext,
): BookmarkRelationsOperations {
  return {
    ..._getBookmarkRelations(context),
  };
}
