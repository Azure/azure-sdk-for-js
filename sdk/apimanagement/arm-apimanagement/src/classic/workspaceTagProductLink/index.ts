// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceTagProductLink/operations.js";
import type {
  WorkspaceTagProductLinkListByProductOptionalParams,
  WorkspaceTagProductLinkDeleteOptionalParams,
  WorkspaceTagProductLinkCreateOrUpdateOptionalParams,
  WorkspaceTagProductLinkGetOptionalParams,
} from "../../api/workspaceTagProductLink/options.js";
import type { TagProductLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceTagProductLink operations. */
export interface WorkspaceTagProductLinkOperations {
  /** Lists a collection of the product links associated with a tag. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    options?: WorkspaceTagProductLinkListByProductOptionalParams,
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
    workspaceId: string,
    tagId: string,
    productLinkId: string,
    options?: WorkspaceTagProductLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds a product to the specified tag via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    productLinkId: string,
    parameters: TagProductLinkContract,
    options?: WorkspaceTagProductLinkCreateOrUpdateOptionalParams,
  ) => Promise<TagProductLinkContract>;
  /** Gets the product link for the tag. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    productLinkId: string,
    options?: WorkspaceTagProductLinkGetOptionalParams,
  ) => Promise<TagProductLinkContract>;
}

function _getWorkspaceTagProductLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      options?: WorkspaceTagProductLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, workspaceId, tagId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      productLinkId: string,
      options?: WorkspaceTagProductLinkDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, workspaceId, tagId, productLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      productLinkId: string,
      parameters: TagProductLinkContract,
      options?: WorkspaceTagProductLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        tagId,
        productLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      productLinkId: string,
      options?: WorkspaceTagProductLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, tagId, productLinkId, options),
  };
}

export function _getWorkspaceTagProductLinkOperations(
  context: ApiManagementContext,
): WorkspaceTagProductLinkOperations {
  return {
    ..._getWorkspaceTagProductLink(context),
  };
}
