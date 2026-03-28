// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/productGroupLink/operations.js";
import type {
  ProductGroupLinkListByProductOptionalParams,
  ProductGroupLinkDeleteOptionalParams,
  ProductGroupLinkCreateOrUpdateOptionalParams,
  ProductGroupLinkGetOptionalParams,
} from "../../api/productGroupLink/options.js";
import type { ProductGroupLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductGroupLink operations. */
export interface ProductGroupLinkOperations {
  /** Lists a collection of the group links associated with a product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductGroupLinkListByProductOptionalParams,
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
    productId: string,
    groupLinkId: string,
    options?: ProductGroupLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds a group to the specified product via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    groupLinkId: string,
    parameters: ProductGroupLinkContract,
    options?: ProductGroupLinkCreateOrUpdateOptionalParams,
  ) => Promise<ProductGroupLinkContract>;
  /** Gets the group link for the product. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    groupLinkId: string,
    options?: ProductGroupLinkGetOptionalParams,
  ) => Promise<ProductGroupLinkContract>;
}

function _getProductGroupLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductGroupLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, productId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      groupLinkId: string,
      options?: ProductGroupLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, groupLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      groupLinkId: string,
      parameters: ProductGroupLinkContract,
      options?: ProductGroupLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        productId,
        groupLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      groupLinkId: string,
      options?: ProductGroupLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, productId, groupLinkId, options),
  };
}

export function _getProductGroupLinkOperations(
  context: ApiManagementContext,
): ProductGroupLinkOperations {
  return {
    ..._getProductGroupLink(context),
  };
}
