// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MarketplaceGalleryImage,
  marketplaceGalleryImageSerializer,
  marketplaceGalleryImageDeserializer,
  MarketplaceGalleryImageTagsUpdate,
  marketplaceGalleryImageTagsUpdateSerializer,
  _MarketplaceGalleryImageListResult,
  _marketplaceGalleryImageListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MarketplaceGalleryImagesListAllOptionalParams,
  MarketplaceGalleryImagesListByResourceGroupOptionalParams,
  MarketplaceGalleryImagesDeleteOptionalParams,
  MarketplaceGalleryImagesUpdateOptionalParams,
  MarketplaceGalleryImagesCreateOrUpdateOptionalParams,
  MarketplaceGalleryImagesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: MarketplaceGalleryImagesListAllOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_MarketplaceGalleryImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _marketplaceGalleryImageListResultDeserializer(result.body);
}

/** Lists all of the marketplace gallery images in the specified subscription. Use the nextLink property in the response to get the next page of marketplace gallery images. */
export function listAll(
  context: Client,
  options: MarketplaceGalleryImagesListAllOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MarketplaceGalleryImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MarketplaceGalleryImagesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MarketplaceGalleryImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _marketplaceGalleryImageListResultDeserializer(result.body);
}

/** Lists all of the marketplace gallery images in the specified resource group. Use the nextLink property in the response to get the next page of marketplace gallery images. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MarketplaceGalleryImagesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MarketplaceGalleryImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  options: MarketplaceGalleryImagesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      marketplaceGalleryImageName: marketplaceGalleryImageName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** The operation to delete a marketplace gallery image. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  options: MarketplaceGalleryImagesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, marketplaceGalleryImageName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  properties: MarketplaceGalleryImageTagsUpdate,
  options: MarketplaceGalleryImagesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      marketplaceGalleryImageName: marketplaceGalleryImageName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: marketplaceGalleryImageTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MarketplaceGalleryImage> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return marketplaceGalleryImageDeserializer(result.body);
}

/** The operation to update a marketplace gallery image. */
export function update(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  properties: MarketplaceGalleryImageTagsUpdate,
  options: MarketplaceGalleryImagesUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<MarketplaceGalleryImage>, MarketplaceGalleryImage> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, marketplaceGalleryImageName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<MarketplaceGalleryImage>, MarketplaceGalleryImage>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  resource: MarketplaceGalleryImage,
  options: MarketplaceGalleryImagesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      marketplaceGalleryImageName: marketplaceGalleryImageName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: marketplaceGalleryImageSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MarketplaceGalleryImage> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return marketplaceGalleryImageDeserializer(result.body);
}

/** The operation to create or update a marketplace gallery image. Please note some properties can be set only during marketplace gallery image creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  resource: MarketplaceGalleryImage,
  options: MarketplaceGalleryImagesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<MarketplaceGalleryImage>, MarketplaceGalleryImage> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        marketplaceGalleryImageName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<MarketplaceGalleryImage>, MarketplaceGalleryImage>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  options: MarketplaceGalleryImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      marketplaceGalleryImageName: marketplaceGalleryImageName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MarketplaceGalleryImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return marketplaceGalleryImageDeserializer(result.body);
}

/** Gets a marketplace gallery image */
export async function get(
  context: Client,
  resourceGroupName: string,
  marketplaceGalleryImageName: string,
  options: MarketplaceGalleryImagesGetOptionalParams = { requestOptions: {} },
): Promise<MarketplaceGalleryImage> {
  const result = await _getSend(context, resourceGroupName, marketplaceGalleryImageName, options);
  return _getDeserialize(result);
}
