// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderContext } from "../../api/edgeOrderContext.js";
import {
  ConfigurationsRequest,
  Configuration,
  ProductFamiliesRequest,
  ProductFamily,
  ProductFamiliesMetadataDetails,
} from "../../models/models.js";
import {
  ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams,
  ProductsAndConfigurationsListProductFamiliesOptionalParams,
  ProductsAndConfigurationsListConfigurationsOptionalParams,
} from "../../api/productsAndConfigurations/options.js";
import {
  listProductFamiliesMetadata,
  listProductFamilies,
  listConfigurations,
} from "../../api/productsAndConfigurations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductsAndConfigurations operations. */
export interface ProductsAndConfigurationsOperations {
  /** List product families metadata for the given subscription. */
  listProductFamiliesMetadata: (
    options?: ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams,
  ) => PagedAsyncIterableIterator<ProductFamiliesMetadataDetails>;
  /** List product families for the given subscription. */
  listProductFamilies: (
    productFamiliesRequest: ProductFamiliesRequest,
    options?: ProductsAndConfigurationsListProductFamiliesOptionalParams,
  ) => PagedAsyncIterableIterator<ProductFamily>;
  /** List configurations for the given product family, product line and product for the given subscription. */
  listConfigurations: (
    configurationsRequest: ConfigurationsRequest,
    options?: ProductsAndConfigurationsListConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<Configuration>;
}

function _getProductsAndConfigurations(context: EdgeOrderContext) {
  return {
    listProductFamiliesMetadata: (
      options?: ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams,
    ) => listProductFamiliesMetadata(context, options),
    listProductFamilies: (
      productFamiliesRequest: ProductFamiliesRequest,
      options?: ProductsAndConfigurationsListProductFamiliesOptionalParams,
    ) => listProductFamilies(context, productFamiliesRequest, options),
    listConfigurations: (
      configurationsRequest: ConfigurationsRequest,
      options?: ProductsAndConfigurationsListConfigurationsOptionalParams,
    ) => listConfigurations(context, configurationsRequest, options),
  };
}

export function _getProductsAndConfigurationsOperations(
  context: EdgeOrderContext,
): ProductsAndConfigurationsOperations {
  return {
    ..._getProductsAndConfigurations(context),
  };
}
