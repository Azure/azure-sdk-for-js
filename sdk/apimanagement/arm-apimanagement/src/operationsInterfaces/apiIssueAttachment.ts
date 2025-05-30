/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  IssueAttachmentContract,
  ApiIssueAttachmentListByServiceOptionalParams,
  ApiIssueAttachmentGetEntityTagOptionalParams,
  ApiIssueAttachmentGetEntityTagResponse,
  ApiIssueAttachmentGetOptionalParams,
  ApiIssueAttachmentGetResponse,
  ApiIssueAttachmentCreateOrUpdateOptionalParams,
  ApiIssueAttachmentCreateOrUpdateResponse,
  ApiIssueAttachmentDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ApiIssueAttachment. */
export interface ApiIssueAttachment {
  /**
   * Lists all attachments for the Issue associated with the specified API.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueAttachmentListByServiceOptionalParams,
  ): PagedAsyncIterableIterator<IssueAttachmentContract>;
  /**
   * Gets the entity state (Etag) version of the issue Attachment for an API specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param attachmentId Attachment identifier within an Issue. Must be unique in the current Issue.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    options?: ApiIssueAttachmentGetEntityTagOptionalParams,
  ): Promise<ApiIssueAttachmentGetEntityTagResponse>;
  /**
   * Gets the details of the issue Attachment for an API specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param attachmentId Attachment identifier within an Issue. Must be unique in the current Issue.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    options?: ApiIssueAttachmentGetOptionalParams,
  ): Promise<ApiIssueAttachmentGetResponse>;
  /**
   * Creates a new Attachment for the Issue in an API or updates an existing one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param attachmentId Attachment identifier within an Issue. Must be unique in the current Issue.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    parameters: IssueAttachmentContract,
    options?: ApiIssueAttachmentCreateOrUpdateOptionalParams,
  ): Promise<ApiIssueAttachmentCreateOrUpdateResponse>;
  /**
   * Deletes the specified comment from an Issue.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param attachmentId Attachment identifier within an Issue. Must be unique in the current Issue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    attachmentId: string,
    ifMatch: string,
    options?: ApiIssueAttachmentDeleteOptionalParams,
  ): Promise<void>;
}
