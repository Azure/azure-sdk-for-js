// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { expand } from "../../api/bookmarkOperations/operations.js";
import { BookmarkOperationsExpandOptionalParams } from "../../api/bookmarkOperations/options.js";
import { BookmarkExpandParameters, BookmarkExpandResponse } from "../../models/models.js";

/** Interface representing a BookmarkOperations operations. */
export interface BookmarkOperationsOperations {
  /** Expand an bookmark */
  expand: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    parameters: BookmarkExpandParameters,
    options?: BookmarkOperationsExpandOptionalParams,
  ) => Promise<BookmarkExpandResponse>;
}

function _getBookmarkOperations(context: SecurityInsightsContext) {
  return {
    expand: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      parameters: BookmarkExpandParameters,
      options?: BookmarkOperationsExpandOptionalParams,
    ) => expand(context, resourceGroupName, workspaceName, bookmarkId, parameters, options),
  };
}

export function _getBookmarkOperationsOperations(
  context: SecurityInsightsContext,
): BookmarkOperationsOperations {
  return {
    ..._getBookmarkOperations(context),
  };
}
