// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import {
  Product,
  ProductUpdate,
  DeviceGroup,
  CountDeviceResponse,
  CountDevicesResponse,
} from "../../models/models.js";
import {
  productsListByCatalog,
  productsGet,
  productsCreateOrUpdate,
  productsDeleteOperation,
  productsUpdate,
  productsGenerateDefaultDeviceGroups,
  productsDeprecated,
  productsCountDevices,
} from "../../api/products/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  ProductsListByCatalogOptions,
  ProductsGetOptions,
  ProductsCreateOrUpdateOptions,
  ProductsDeleteOperationOptions,
  ProductsUpdateOptions,
  ProductsGenerateDefaultDeviceGroupsOptions,
  ProductsDeprecatedOptions,
  ProductsCountDevicesOptions,
} from "../../models/options.js";

export interface ProductsOperations {
  listByCatalog: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: ProductsListByCatalogOptions,
  ) => PagedAsyncIterableIterator<Product>;
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGetOptions,
  ) => Promise<Product>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    resource: Product,
    options?: ProductsCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Product>, Product>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    properties: ProductUpdate,
    options?: ProductsUpdateOptions,
  ) => PollerLike<OperationState<Product>, Product>;
  generateDefaultDeviceGroups: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGenerateDefaultDeviceGroupsOptions,
  ) => PagedAsyncIterableIterator<DeviceGroup>;
  deprecated: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsDeprecatedOptions,
  ) => Promise<CountDeviceResponse>;
  countDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsCountDevicesOptions,
  ) => Promise<CountDevicesResponse>;
}

export function getProducts(context: AzureSphereContext) {
  return {
    listByCatalog: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: ProductsListByCatalogOptions,
    ) =>
      productsListByCatalog(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsGetOptions,
    ) =>
      productsGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      resource: Product,
      options?: ProductsCreateOrUpdateOptions,
    ) =>
      productsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        resource,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsDeleteOperationOptions,
    ) =>
      productsDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      properties: ProductUpdate,
      options?: ProductsUpdateOptions,
    ) =>
      productsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        properties,
        options,
      ),
    generateDefaultDeviceGroups: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsGenerateDefaultDeviceGroupsOptions,
    ) =>
      productsGenerateDefaultDeviceGroups(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    deprecated: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsDeprecatedOptions,
    ) =>
      productsDeprecated(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    countDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: ProductsCountDevicesOptions,
    ) =>
      productsCountDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
  };
}

export function getProductsOperations(
  context: AzureSphereContext,
): ProductsOperations {
  return {
    ...getProducts(context),
  };
}
