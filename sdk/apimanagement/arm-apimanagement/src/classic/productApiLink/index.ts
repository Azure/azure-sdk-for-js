// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/productApiLink/operations.js";
import type {
  ProductApiLinkListByProductOptionalParams,
  ProductApiLinkDeleteOptionalParams,
  ProductApiLinkCreateOrUpdateOptionalParams,
  ProductApiLinkGetOptionalParams,
} from "../../api/productApiLink/options.js";
import type { ProductApiLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductApiLink operations. */
export interface ProductApiLinkOperations {
  /** Lists a collection of the API links associated with a product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductApiLinkListByProductOptionalParams,
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
    productId: string,
    apiLinkId: string,
    options?: ProductApiLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an API to the specified product via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    apiLinkId: string,
    parameters: ProductApiLinkContract,
    options?: ProductApiLinkCreateOrUpdateOptionalParams,
  ) => Promise<ProductApiLinkContract>;
  /** Gets the API link for the product. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    apiLinkId: string,
    options?: ProductApiLinkGetOptionalParams,
  ) => Promise<ProductApiLinkContract>;
}

function _getProductApiLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductApiLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, productId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      apiLinkId: string,
      options?: ProductApiLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, apiLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      apiLinkId: string,
      parameters: ProductApiLinkContract,
      options?: ProductApiLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        productId,
        apiLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      apiLinkId: string,
      options?: ProductApiLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, productId, apiLinkId, options),
  };
}

export function _getProductApiLinkOperations(
  context: ApiManagementContext,
): ProductApiLinkOperations {
  return {
    ..._getProductApiLink(context),
  };
}
