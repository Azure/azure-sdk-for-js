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
  listByTags,
} from "../../api/product/operations.js";
import type {
  ProductListByServiceOptionalParams,
  ProductDeleteOptionalParams,
  ProductUpdateOptionalParams,
  ProductCreateOrUpdateOptionalParams,
  ProductGetEntityTagOptionalParams,
  ProductGetOptionalParams,
  ProductListByTagsOptionalParams,
} from "../../api/product/options.js";
import type {
  ProductContract,
  ProductUpdateParameters,
  TagResourceContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Product operations. */
export interface ProductOperations {
  /** Lists a collection of products in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: ProductListByServiceOptionalParams,
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
    productId: string,
    ifMatch: string,
    options?: ProductDeleteOptionalParams,
  ) => Promise<void>;
  /** Update existing product details. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    ifMatch: string,
    parameters: ProductUpdateParameters,
    options?: ProductUpdateOptionalParams,
  ) => Promise<ProductContract>;
  /** Creates or Updates a product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    parameters: ProductContract,
    options?: ProductCreateOrUpdateOptionalParams,
  ) => Promise<ProductContract>;
  /** Gets the entity state (Etag) version of the product specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the product specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductGetOptionalParams,
  ) => Promise<ProductContract>;
  /** Lists a collection of products associated with tags. */
  listByTags: (
    resourceGroupName: string,
    serviceName: string,
    options?: ProductListByTagsOptionalParams,
  ) => PagedAsyncIterableIterator<TagResourceContract>;
}

function _getProduct(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: ProductListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      ifMatch: string,
      options?: ProductDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      ifMatch: string,
      parameters: ProductUpdateParameters,
      options?: ProductUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, productId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      parameters: ProductContract,
      options?: ProductCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, productId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, productId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, productId, options),
    listByTags: (
      resourceGroupName: string,
      serviceName: string,
      options?: ProductListByTagsOptionalParams,
    ) => listByTags(context, resourceGroupName, serviceName, options),
  };
}

export function _getProductOperations(context: ApiManagementContext): ProductOperations {
  return {
    ..._getProduct(context),
  };
}
