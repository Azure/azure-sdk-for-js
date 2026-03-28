// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiIssueComment/operations.js";
import type {
  ApiIssueCommentListByServiceOptionalParams,
  ApiIssueCommentDeleteOptionalParams,
  ApiIssueCommentCreateOrUpdateOptionalParams,
  ApiIssueCommentGetEntityTagOptionalParams,
  ApiIssueCommentGetOptionalParams,
} from "../../api/apiIssueComment/options.js";
import type { IssueCommentContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiIssueComment operations. */
export interface ApiIssueCommentOperations {
  /** Lists all comments for the Issue associated with the specified API. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueCommentListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<IssueCommentContract>;
  /** Deletes the specified comment from an Issue. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    commentId: string,
    ifMatch: string,
    options?: ApiIssueCommentDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new Comment for the Issue in an API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    commentId: string,
    parameters: IssueCommentContract,
    options?: ApiIssueCommentCreateOrUpdateOptionalParams,
  ) => Promise<IssueCommentContract>;
  /** Gets the entity state (Etag) version of the issue Comment for an API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    commentId: string,
    options?: ApiIssueCommentGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the issue Comment for an API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    commentId: string,
    options?: ApiIssueCommentGetOptionalParams,
  ) => Promise<IssueCommentContract>;
}

function _getApiIssueComment(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      options?: ApiIssueCommentListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, issueId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      commentId: string,
      ifMatch: string,
      options?: ApiIssueCommentDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, apiId, issueId, commentId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      commentId: string,
      parameters: IssueCommentContract,
      options?: ApiIssueCommentCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        commentId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      commentId: string,
      options?: ApiIssueCommentGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, issueId, commentId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      commentId: string,
      options?: ApiIssueCommentGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, issueId, commentId, options),
  };
}

export function _getApiIssueCommentOperations(
  context: ApiManagementContext,
): ApiIssueCommentOperations {
  return {
    ..._getApiIssueComment(context),
  };
}
