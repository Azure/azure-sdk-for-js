// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext } from "../../api/azureSphereContext.js";
import {
  generateDefaultDeviceGroups,
  countDevices,
  listByCatalog,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/products/operations.js";
import type {
  ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ProductsCountDevicesOptionalParams,
  ProductsListByCatalogOptionalParams,
  ProductsDeleteOptionalParams,
  ProductsUpdateOptionalParams,
  ProductsCreateOrUpdateOptionalParams,
  ProductsGetOptionalParams,
} from "../../api/products/options.js";
import type {
  CountDevicesResponse,
  DeviceGroup,
  Product,
  ProductUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Products operations. */
export interface ProductsOperations {
  /** Generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  generateDefaultDeviceGroups: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceGroup>;
  /** Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  countDevices: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsCountDevicesOptionalParams,
  ) => Promise<CountDevicesResponse>;
  /** List Product resources by Catalog */
  listByCatalog: (
    resourceGroupName: string,
    catalogName: string,
    options?: ProductsListByCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<Product>;
  /** Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name' */
  delete: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  update: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    properties: ProductUpdate,
    options?: ProductsUpdateOptionalParams,
  ) => PollerLike<OperationState<Product>, Product>;
  /** Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  createOrUpdate: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    resource: Product,
    options?: ProductsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Product>, Product>;
  /** Get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  get: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGetOptionalParams,
  ) => Promise<Product>;
}

function _getProducts(context: AzureSphereContext) {
  return {
    generateDefaultDeviceGroups: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsGenerateDefaultDeviceGroupsOptionalParams,
    ) => generateDefaultDeviceGroups(context, resourceGroupName, catalogName, productName, options),
    countDevices: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsCountDevicesOptionalParams,
    ) => countDevices(context, resourceGroupName, catalogName, productName, options),
    listByCatalog: (
      resourceGroupName: string,
      catalogName: string,
      options?: ProductsListByCatalogOptionalParams,
    ) => listByCatalog(context, resourceGroupName, catalogName, options),
    delete: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, catalogName, productName, options),
    update: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      properties: ProductUpdate,
      options?: ProductsUpdateOptionalParams,
    ) => update(context, resourceGroupName, catalogName, productName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      resource: Product,
      options?: ProductsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, catalogName, productName, resource, options),
    get: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsGetOptionalParams,
    ) => get(context, resourceGroupName, catalogName, productName, options),
  };
}

export function _getProductsOperations(context: AzureSphereContext): ProductsOperations {
  return {
    ..._getProducts(context),
  };
}
