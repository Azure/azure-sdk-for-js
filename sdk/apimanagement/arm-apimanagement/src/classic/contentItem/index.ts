// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/contentItem/operations.js";
import type {
  ContentItemListByServiceOptionalParams,
  ContentItemDeleteOptionalParams,
  ContentItemCreateOrUpdateOptionalParams,
  ContentItemGetEntityTagOptionalParams,
  ContentItemGetOptionalParams,
} from "../../api/contentItem/options.js";
import type { ContentItemContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContentItem operations. */
export interface ContentItemOperations {
  /** Lists developer portal's content items specified by the provided content type. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    options?: ContentItemListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ContentItemContract>;
  /** Removes the specified developer portal's content item. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    contentItemId: string,
    ifMatch: string,
    options?: ContentItemDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new developer portal's content item specified by the provided content type. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    contentItemId: string,
    parameters: ContentItemContract,
    options?: ContentItemCreateOrUpdateOptionalParams,
  ) => Promise<ContentItemContract>;
  /** Returns the entity state (ETag) version of the developer portal's content item specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    contentItemId: string,
    options?: ContentItemGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Returns the developer portal's content item specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    contentItemId: string,
    options?: ContentItemGetOptionalParams,
  ) => Promise<ContentItemContract>;
}

function _getContentItem(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      options?: ContentItemListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, contentTypeId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      contentItemId: string,
      ifMatch: string,
      options?: ContentItemDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        contentTypeId,
        contentItemId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      contentItemId: string,
      parameters: ContentItemContract,
      options?: ContentItemCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        contentTypeId,
        contentItemId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      contentItemId: string,
      options?: ContentItemGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, contentTypeId, contentItemId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      contentItemId: string,
      options?: ContentItemGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, contentTypeId, contentItemId, options),
  };
}

export function _getContentItemOperations(context: ApiManagementContext): ContentItemOperations {
  return {
    ..._getContentItem(context),
  };
}
