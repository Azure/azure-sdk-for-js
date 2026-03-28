// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  checkEntityExists,
  listByProduct,
} from "../../api/productApi/operations.js";
import type {
  ProductApiDeleteOptionalParams,
  ProductApiCreateOrUpdateOptionalParams,
  ProductApiCheckEntityExistsOptionalParams,
  ProductApiListByProductOptionalParams,
} from "../../api/productApi/options.js";
import type { ApiContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductApi operations. */
export interface ProductApiOperations {
  /** Deletes the specified API from the specified product. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    apiId: string,
    options?: ProductApiDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an API to the specified product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    apiId: string,
    options?: ProductApiCreateOrUpdateOptionalParams,
  ) => Promise<ApiContract>;
  /** Checks that API entity specified by identifier is associated with the Product entity. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    apiId: string,
    options?: ProductApiCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Lists a collection of the APIs associated with a product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductApiListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<ApiContract>;
}

function _getProductApi(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      apiId: string,
      options?: ProductApiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, apiId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      apiId: string,
      options?: ProductApiCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, productId, apiId, options),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      apiId: string,
      options?: ProductApiCheckEntityExistsOptionalParams,
    ) => checkEntityExists(context, resourceGroupName, serviceName, productId, apiId, options),
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductApiListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, productId, options),
  };
}

export function _getProductApiOperations(context: ApiManagementContext): ProductApiOperations {
  return {
    ..._getProductApi(context),
  };
}
