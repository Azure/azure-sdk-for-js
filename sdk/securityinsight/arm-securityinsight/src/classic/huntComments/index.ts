// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/huntComments/operations.js";
import type {
  HuntCommentsListOptionalParams,
  HuntCommentsDeleteOptionalParams,
  HuntCommentsCreateOrUpdateOptionalParams,
  HuntCommentsGetOptionalParams,
} from "../../api/huntComments/options.js";
import type { HuntComment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
