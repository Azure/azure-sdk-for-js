// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiIssueAttachment/operations.js";
import type {
  ApiIssueAttachmentListByServiceOptionalParams,
  ApiIssueAttachmentDeleteOptionalParams,
  ApiIssueAttachmentCreateOrUpdateOptionalParams,
  ApiIssueAttachmentGetEntityTagOptionalParams,
  ApiIssueAttachmentGetOptionalParams,
} from "../../api/apiIssueAttachment/options.js";
import type { IssueAttachmentContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiIssueAttachment operations. */
export interface ApiIssueAttachmentOperations {
  /** Lists all attachments for the Issue associated with the specified API. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueAttachmentListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<IssueAttachmentContract>;
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
    attachmentId: string,
    ifMatch: string,
    options?: ApiIssueAttachmentDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new Attachment for the Issue in an API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    parameters: IssueAttachmentContract,
    options?: ApiIssueAttachmentCreateOrUpdateOptionalParams,
  ) => Promise<IssueAttachmentContract>;
  /** Gets the entity state (Etag) version of the issue Attachment for an API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    options?: ApiIssueAttachmentGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the issue Attachment for an API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    options?: ApiIssueAttachmentGetOptionalParams,
  ) => Promise<IssueAttachmentContract>;
}

function _getApiIssueAttachment(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      options?: ApiIssueAttachmentListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, issueId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      attachmentId: string,
      ifMatch: string,
      options?: ApiIssueAttachmentDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        attachmentId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      attachmentId: string,
      parameters: IssueAttachmentContract,
      options?: ApiIssueAttachmentCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        attachmentId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      attachmentId: string,
      options?: ApiIssueAttachmentGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, apiId, issueId, attachmentId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      attachmentId: string,
      options?: ApiIssueAttachmentGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, issueId, attachmentId, options),
  };
}

export function _getApiIssueAttachmentOperations(
  context: ApiManagementContext,
): ApiIssueAttachmentOperations {
  return {
    ..._getApiIssueAttachment(context),
  };
}
