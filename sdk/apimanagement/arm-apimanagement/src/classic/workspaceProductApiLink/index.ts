// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceProductApiLink/operations.js";
import type {
  WorkspaceProductApiLinkListByProductOptionalParams,
  WorkspaceProductApiLinkDeleteOptionalParams,
  WorkspaceProductApiLinkCreateOrUpdateOptionalParams,
  WorkspaceProductApiLinkGetOptionalParams,
} from "../../api/workspaceProductApiLink/options.js";
import type { ProductApiLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceProductApiLink operations. */
export interface WorkspaceProductApiLinkOperations {
  /** Lists a collection of the API links associated with a product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    options?: WorkspaceProductApiLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<ProductApiLinkContract>;
  /** Deletes the specified API from the specified product. */
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
    apiLinkId: string,
    options?: WorkspaceProductApiLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an API to the specified product via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    apiLinkId: string,
    parameters: ProductApiLinkContract,
    options?: WorkspaceProductApiLinkCreateOrUpdateOptionalParams,
  ) => Promise<ProductApiLinkContract>;
  /** Gets the API link for the product. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    apiLinkId: string,
    options?: WorkspaceProductApiLinkGetOptionalParams,
  ) => Promise<ProductApiLinkContract>;
}

function _getWorkspaceProductApiLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      options?: WorkspaceProductApiLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, workspaceId, productId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      apiLinkId: string,
      options?: WorkspaceProductApiLinkDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, workspaceId, productId, apiLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      apiLinkId: string,
      parameters: ProductApiLinkContract,
      options?: WorkspaceProductApiLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        apiLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      apiLinkId: string,
      options?: WorkspaceProductApiLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, productId, apiLinkId, options),
  };
}

export function _getWorkspaceProductApiLinkOperations(
  context: ApiManagementContext,
): WorkspaceProductApiLinkOperations {
  return {
    ..._getWorkspaceProductApiLink(context),
  };
}
