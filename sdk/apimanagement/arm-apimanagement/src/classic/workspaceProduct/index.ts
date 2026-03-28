// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceProduct/operations.js";
import type {
  WorkspaceProductListByServiceOptionalParams,
  WorkspaceProductDeleteOptionalParams,
  WorkspaceProductUpdateOptionalParams,
  WorkspaceProductCreateOrUpdateOptionalParams,
  WorkspaceProductGetEntityTagOptionalParams,
  WorkspaceProductGetOptionalParams,
} from "../../api/workspaceProduct/options.js";
import type { ProductContract, ProductUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceProduct operations. */
export interface WorkspaceProductOperations {
  /** Lists a collection of products in the specified workspace in a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceProductListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ProductContract>;
  /** Delete product. */
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
    ifMatch: string,
    options?: WorkspaceProductDeleteOptionalParams,
  ) => Promise<void>;
  /** Update existing product details. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    ifMatch: string,
    parameters: ProductUpdateParameters,
    options?: WorkspaceProductUpdateOptionalParams,
  ) => Promise<ProductContract>;
  /** Creates or Updates a product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    parameters: ProductContract,
    options?: WorkspaceProductCreateOrUpdateOptionalParams,
  ) => Promise<ProductContract>;
  /** Gets the entity state (Etag) version of the product specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    options?: WorkspaceProductGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the product specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    options?: WorkspaceProductGetOptionalParams,
  ) => Promise<ProductContract>;
}

function _getWorkspaceProduct(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceProductListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      ifMatch: string,
      options?: WorkspaceProductDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, productId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      ifMatch: string,
      parameters: ProductUpdateParameters,
      options?: WorkspaceProductUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      parameters: ProductContract,
      options?: WorkspaceProductCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      options?: WorkspaceProductGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, productId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      options?: WorkspaceProductGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, productId, options),
  };
}

export function _getWorkspaceProductOperations(
  context: ApiManagementContext,
): WorkspaceProductOperations {
  return {
    ..._getWorkspaceProduct(context),
  };
}
