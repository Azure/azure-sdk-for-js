// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceProductGroupLink/operations.js";
import type {
  WorkspaceProductGroupLinkListByProductOptionalParams,
  WorkspaceProductGroupLinkDeleteOptionalParams,
  WorkspaceProductGroupLinkCreateOrUpdateOptionalParams,
  WorkspaceProductGroupLinkGetOptionalParams,
} from "../../api/workspaceProductGroupLink/options.js";
import type { ProductGroupLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceProductGroupLink operations. */
export interface WorkspaceProductGroupLinkOperations {
  /** Lists a collection of the group links associated with a product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    options?: WorkspaceProductGroupLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<ProductGroupLinkContract>;
  /** Deletes the specified group from the specified product. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    groupLinkId: string,
    options?: WorkspaceProductGroupLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds a group to the specified product via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    groupLinkId: string,
    parameters: ProductGroupLinkContract,
    options?: WorkspaceProductGroupLinkCreateOrUpdateOptionalParams,
  ) => Promise<ProductGroupLinkContract>;
  /** Gets the group link for the product. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    groupLinkId: string,
    options?: WorkspaceProductGroupLinkGetOptionalParams,
  ) => Promise<ProductGroupLinkContract>;
}

function _getWorkspaceProductGroupLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      options?: WorkspaceProductGroupLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, workspaceId, productId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      groupLinkId: string,
      options?: WorkspaceProductGroupLinkDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        groupLinkId,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      groupLinkId: string,
      parameters: ProductGroupLinkContract,
      options?: WorkspaceProductGroupLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        groupLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      groupLinkId: string,
      options?: WorkspaceProductGroupLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, productId, groupLinkId, options),
  };
}

export function _getWorkspaceProductGroupLinkOperations(
  context: ApiManagementContext,
): WorkspaceProductGroupLinkOperations {
  return {
    ..._getWorkspaceProductGroupLink(context),
  };
}
