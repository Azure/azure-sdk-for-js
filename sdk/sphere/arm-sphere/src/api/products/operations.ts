// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext as Client } from "../index.js";
import type {
  CountDevicesResponse,
  _DeviceGroupListResult,
  DeviceGroup,
  Product,
  ProductUpdate,
  _ProductListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  countDevicesResponseDeserializer,
  _deviceGroupListResultDeserializer,
  productSerializer,
  productDeserializer,
  productUpdateSerializer,
  _productListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ProductsCountDevicesOptionalParams,
  ProductsListByCatalogOptionalParams,
  ProductsDeleteOptionalParams,
  ProductsUpdateOptionalParams,
  ProductsCreateOrUpdateOptionalParams,
  ProductsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _generateDefaultDeviceGroupsSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGenerateDefaultDeviceGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/generateDefaultDeviceGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _generateDefaultDeviceGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceGroupListResultDeserializer(result.body);
}

/** Generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function generateDefaultDeviceGroups(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGenerateDefaultDeviceGroupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _generateDefaultDeviceGroupsSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    _generateDefaultDeviceGroupsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _countDevicesSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsCountDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/countDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _countDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<CountDevicesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return countDevicesResponseDeserializer(result.body);
}

/** Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export async function countDevices(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsCountDevicesOptionalParams = { requestOptions: {} },
): Promise<CountDevicesResponse> {
  const result = await _countDevicesSend(
    context,
    resourceGroupName,
    catalogName,
    productName,
    options,
  );
  return _countDevicesDeserialize(result);
}

export function _listByCatalogSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: ProductsListByCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProductListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _productListResultDeserializer(result.body);
}

/** List Product resources by Catalog */
export function listByCatalog(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: ProductsListByCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Product> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCatalogSend(context, resourceGroupName, catalogName, options),
    _listByCatalogDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name' */
export function $delete(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, catalogName, productName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  properties: ProductUpdate,
  options: ProductsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: productUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Product> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return productDeserializer(result.body);
}

/** Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function update(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  properties: ProductUpdate,
  options: ProductsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Product>, Product> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, catalogName, productName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<Product>, Product>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  resource: Product,
  options: ProductsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: productSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Product> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return productDeserializer(result.body);
}

/** Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  resource: Product,
  options: ProductsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Product>, Product> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, catalogName, productName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<Product>, Product>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Product> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return productDeserializer(result.body);
}

/** Get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: ProductsGetOptionalParams = { requestOptions: {} },
): Promise<Product> {
  const result = await _getSend(context, resourceGroupName, catalogName, productName, options);
  return _getDeserialize(result);
}
