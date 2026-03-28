// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByProduct, $delete, createOrUpdate, get } from "../../api/tagApiLink/operations.js";
import type {
  TagApiLinkListByProductOptionalParams,
  TagApiLinkDeleteOptionalParams,
  TagApiLinkCreateOrUpdateOptionalParams,
  TagApiLinkGetOptionalParams,
} from "../../api/tagApiLink/options.js";
import type { TagApiLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TagApiLink operations. */
export interface TagApiLinkOperations {
  /** Lists a collection of the API links associated with a tag. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    options?: TagApiLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<TagApiLinkContract>;
  /** Deletes the specified API from the specified tag. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    apiLinkId: string,
    options?: TagApiLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an API to the specified tag via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    apiLinkId: string,
    parameters: TagApiLinkContract,
    options?: TagApiLinkCreateOrUpdateOptionalParams,
  ) => Promise<TagApiLinkContract>;
  /** Gets the API link for the tag. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    apiLinkId: string,
    options?: TagApiLinkGetOptionalParams,
  ) => Promise<TagApiLinkContract>;
}

function _getTagApiLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      options?: TagApiLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, tagId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      apiLinkId: string,
      options?: TagApiLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, tagId, apiLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      apiLinkId: string,
      parameters: TagApiLinkContract,
      options?: TagApiLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        tagId,
        apiLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      apiLinkId: string,
      options?: TagApiLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, tagId, apiLinkId, options),
  };
}

export function _getTagApiLinkOperations(context: ApiManagementContext): TagApiLinkOperations {
  return {
    ..._getTagApiLink(context),
  };
}
