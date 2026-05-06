// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/huntComments/operations.js";
import {
  HuntCommentsListOptionalParams,
  HuntCommentsDeleteOptionalParams,
  HuntCommentsCreateOrUpdateOptionalParams,
  HuntCommentsGetOptionalParams,
} from "../../api/huntComments/options.js";
import { HuntComment } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HuntComments operations. */
export interface HuntCommentsOperations {
  /** Gets all hunt comments */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    options?: HuntCommentsListOptionalParams,
  ) => PagedAsyncIterableIterator<HuntComment>;
  /** Delete a hunt comment. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    huntCommentId: string,
    options?: HuntCommentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a hunt relation. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    huntCommentId: string,
    huntComment: HuntComment,
    options?: HuntCommentsCreateOrUpdateOptionalParams,
  ) => Promise<HuntComment>;
  /** Gets a hunt comment */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    huntCommentId: string,
    options?: HuntCommentsGetOptionalParams,
  ) => Promise<HuntComment>;
}

function _getHuntComments(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      options?: HuntCommentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, huntId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      huntCommentId: string,
      options?: HuntCommentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, huntId, huntCommentId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      huntCommentId: string,
      huntComment: HuntComment,
      options?: HuntCommentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        huntId,
        huntCommentId,
        huntComment,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      huntCommentId: string,
      options?: HuntCommentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, huntId, huntCommentId, options),
  };
}

export function _getHuntCommentsOperations(
  context: SecurityInsightsContext,
): HuntCommentsOperations {
  return {
    ..._getHuntComments(context),
  };
}
