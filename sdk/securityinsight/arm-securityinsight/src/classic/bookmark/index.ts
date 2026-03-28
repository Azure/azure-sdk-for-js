// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { expand } from "../../api/bookmark/operations.js";
import type { BookmarkExpandOptionalParams } from "../../api/bookmark/options.js";
import type { BookmarkExpandParameters, BookmarkExpandResponse } from "../../models/models.js";

/** Interface representing a Bookmark operations. */
export interface BookmarkOperations {
  /** Expand an bookmark */
  expand: (
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    parameters: BookmarkExpandParameters,
    options?: BookmarkExpandOptionalParams,
  ) => Promise<BookmarkExpandResponse>;
}

function _getBookmark(context: SecurityInsightsContext) {
  return {
    expand: (
      resourceGroupName: string,
      workspaceName: string,
      bookmarkId: string,
      parameters: BookmarkExpandParameters,
      options?: BookmarkExpandOptionalParams,
    ) => expand(context, resourceGroupName, workspaceName, bookmarkId, parameters, options),
  };
}

export function _getBookmarkOperations(context: SecurityInsightsContext): BookmarkOperations {
  return {
    ..._getBookmark(context),
  };
}
