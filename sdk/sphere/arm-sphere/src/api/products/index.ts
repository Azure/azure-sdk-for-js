// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  ProductListResult,
  Product,
  ProductUpdate,
  DeviceGroupListResult,
  DeviceGroup,
  CountDeviceResponse,
  CountDevicesResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  ProductsCountDevices200Response,
  ProductsCountDevicesDefaultResponse,
  ProductsCreateOrUpdate200Response,
  ProductsCreateOrUpdate201Response,
  ProductsCreateOrUpdateDefaultResponse,
  ProductsCreateOrUpdateLogicalResponse,
  ProductsDeleteLogicalResponse,
  ProductsDeleteOperation200Response,
  ProductsDeleteOperation202Response,
  ProductsDeleteOperation204Response,
  ProductsDeleteOperationDefaultResponse,
  ProductsDeprecated200Response,
  ProductsDeprecatedDefaultResponse,
  ProductsGenerateDefaultDeviceGroups200Response,
  ProductsGenerateDefaultDeviceGroupsDefaultResponse,
  ProductsGet200Response,
  ProductsGetDefaultResponse,
  ProductsListByCatalog200Response,
  ProductsListByCatalogDefaultResponse,
  ProductsUpdate200Response,
  ProductsUpdate202Response,
  ProductsUpdateDefaultResponse,
  ProductsUpdateLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
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

export function _productsListByCatalogSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: ProductsListByCatalogOptions = { requestOptions: {} },
): StreamableMethod<
  ProductsListByCatalog200Response | ProductsListByCatalogDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _productsListByCatalogDeserialize(
  result:
    | ProductsListByCatalog200Response
    | ProductsListByCatalogDefaultResponse,
): Promise<ProductListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            description: p.properties?.["description"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Product resources by Catalog */
export function productsListByCatalog(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: ProductsListByCatalogOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Product> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _productsListByCatalogSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    _productsListByCatalogDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _productsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGetOptions = { requestOptions: {} },
): StreamableMethod<ProductsGet200Response | ProductsGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _productsGetDeserialize(
  result: ProductsGet200Response | ProductsGetDefaultResponse,
): Promise<Product> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          description: result.body.properties?.["description"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export async function productsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGetOptions = { requestOptions: {} },
): Promise<Product> {
  const result = await _productsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    options,
  );
  return _productsGetDeserialize(result);
}

export function _productsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  resource: Product,
  options: ProductsCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | ProductsCreateOrUpdate200Response
  | ProductsCreateOrUpdate201Response
  | ProductsCreateOrUpdateDefaultResponse
  | ProductsCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? undefined
          : { description: resource.properties?.["description"] },
      },
    });
}

export async function _productsCreateOrUpdateDeserialize(
  result:
    | ProductsCreateOrUpdate200Response
    | ProductsCreateOrUpdate201Response
    | ProductsCreateOrUpdateDefaultResponse
    | ProductsCreateOrUpdateLogicalResponse,
): Promise<Product> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as ProductsCreateOrUpdateLogicalResponse;
  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          description: result.body.properties?.["description"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function productsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  resource: Product,
  options: ProductsCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Product>, Product> {
  return getLongRunningPoller(context, _productsCreateOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _productsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<Product>, Product>;
}

export function _productsDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | ProductsDeleteOperation200Response
  | ProductsDeleteOperation202Response
  | ProductsDeleteOperation204Response
  | ProductsDeleteOperationDefaultResponse
  | ProductsDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _productsDeleteOperationDeserialize(
  result:
    | ProductsDeleteOperation200Response
    | ProductsDeleteOperation202Response
    | ProductsDeleteOperation204Response
    | ProductsDeleteOperationDefaultResponse
    | ProductsDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as ProductsDeleteLogicalResponse;
  return;
}

/** Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name' */
export function productsDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _productsDeleteOperationDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _productsDeleteOperationSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _productsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  properties: ProductUpdate,
  options: ProductsUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | ProductsUpdate200Response
  | ProductsUpdate202Response
  | ProductsUpdateDefaultResponse
  | ProductsUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !properties.properties
          ? undefined
          : { description: properties.properties?.["description"] },
      },
    });
}

export async function _productsUpdateDeserialize(
  result:
    | ProductsUpdate200Response
    | ProductsUpdate202Response
    | ProductsUpdateDefaultResponse
    | ProductsUpdateLogicalResponse,
): Promise<Product> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function productsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  properties: ProductUpdate,
  options: ProductsUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Product>, Product> {
  return getLongRunningPoller(context, _productsUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _productsUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<Product>, Product>;
}

export function _productsGenerateDefaultDeviceGroupsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGenerateDefaultDeviceGroupsOptions = { requestOptions: {} },
): StreamableMethod<
  | ProductsGenerateDefaultDeviceGroups200Response
  | ProductsGenerateDefaultDeviceGroupsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/generateDefaultDeviceGroups",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _productsGenerateDefaultDeviceGroupsDeserialize(
  result:
    | ProductsGenerateDefaultDeviceGroups200Response
    | ProductsGenerateDefaultDeviceGroupsDefaultResponse,
): Promise<DeviceGroupListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            description: p.properties?.["description"],
            osFeedType: p.properties?.["osFeedType"],
            updatePolicy: p.properties?.["updatePolicy"],
            allowCrashDumpsCollection:
              p.properties?.["allowCrashDumpsCollection"],
            regionalDataBoundary: p.properties?.["regionalDataBoundary"],
            hasDeployment: p.properties?.["hasDeployment"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** Generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function productsGenerateDefaultDeviceGroups(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGenerateDefaultDeviceGroupsOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _productsGenerateDefaultDeviceGroupsSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    _productsGenerateDefaultDeviceGroupsDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _productsDeprecatedSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsDeprecatedOptions = { requestOptions: {} },
): StreamableMethod<
  ProductsDeprecated200Response | ProductsDeprecatedDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/countDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
    }) as StreamableMethod<
    ProductsDeprecated200Response | ProductsDeprecatedDefaultResponse
  >;
}

export async function _productsDeprecatedDeserialize(
  result: ProductsDeprecated200Response | ProductsDeprecatedDefaultResponse,
): Promise<CountDeviceResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
  };
}

/** Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export async function productsDeprecated(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsDeprecatedOptions = { requestOptions: {} },
): Promise<CountDeviceResponse> {
  const result = await _productsDeprecatedSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    options,
  );
  return _productsDeprecatedDeserialize(result);
}

export function _productsCountDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsCountDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  ProductsCountDevices200Response | ProductsCountDevicesDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/countDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
    }) as StreamableMethod<
    ProductsCountDevices200Response | ProductsCountDevicesDefaultResponse
  >;
}

export async function _productsCountDevicesDeserialize(
  result: ProductsCountDevices200Response | ProductsCountDevicesDefaultResponse,
): Promise<CountDevicesResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
  };
}

/** Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export async function productsCountDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsCountDevicesOptions = { requestOptions: {} },
): Promise<CountDevicesResponse> {
  const result = await _productsCountDevicesSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    options,
  );
  return _productsCountDevicesDeserialize(result);
}
