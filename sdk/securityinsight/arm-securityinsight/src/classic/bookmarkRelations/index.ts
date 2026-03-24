// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/bookmarkRelations/operations.js";
import type {
  BookmarkRelationsListOptionalParams,
  BookmarkRelationsDeleteOptionalParams,
  BookmarkRelationsCreateOrUpdateOptionalParams,
  BookmarkRelationsGetOptionalParams,
} from "../../api/bookmarkRelations/options.js";
import type { Relation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
