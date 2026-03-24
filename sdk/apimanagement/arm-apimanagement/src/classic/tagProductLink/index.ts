// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/tagProductLink/operations.js";
import type {
  TagProductLinkListByProductOptionalParams,
  TagProductLinkDeleteOptionalParams,
  TagProductLinkCreateOrUpdateOptionalParams,
  TagProductLinkGetOptionalParams,
} from "../../api/tagProductLink/options.js";
import type { TagProductLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TagProductLink operations. */
export interface TagProductLinkOperations {
  /** Lists a collection of the product links associated with a tag. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    options?: TagProductLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<TagProductLinkContract>;
  /** Deletes the specified product from the specified tag. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    productLinkId: string,
    options?: TagProductLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds a product to the specified tag via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    productLinkId: string,
    parameters: TagProductLinkContract,
    options?: TagProductLinkCreateOrUpdateOptionalParams,
  ) => Promise<TagProductLinkContract>;
  /** Gets the product link for the tag. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    productLinkId: string,
    options?: TagProductLinkGetOptionalParams,
  ) => Promise<TagProductLinkContract>;
}

function _getTagProductLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      options?: TagProductLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, tagId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      productLinkId: string,
      options?: TagProductLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, tagId, productLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      productLinkId: string,
      parameters: TagProductLinkContract,
      options?: TagProductLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        tagId,
        productLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      productLinkId: string,
      options?: TagProductLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, tagId, productLinkId, options),
  };
}

export function _getTagProductLinkOperations(
  context: ApiManagementContext,
): TagProductLinkOperations {
  return {
    ..._getTagProductLink(context),
  };
}
