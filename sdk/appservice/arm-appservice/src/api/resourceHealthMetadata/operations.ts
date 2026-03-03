// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  ResourceHealthMetadata,
  _ResourceHealthMetadataCollection,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  resourceHealthMetadataDeserializer,
  _resourceHealthMetadataCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResourceHealthMetadataListByResourceGroupOptionalParams,
  ResourceHealthMetadataListOptionalParams,
  ResourceHealthMetadataListBySiteSlotOptionalParams,
  ResourceHealthMetadataGetBySiteSlotOptionalParams,
  ResourceHealthMetadataListBySiteOptionalParams,
  ResourceHealthMetadataGetBySiteOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ResourceHealthMetadataListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/resourceHealthMetadata{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceHealthMetadataCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceHealthMetadataCollectionDeserializer(result.body);
}

/** Description for List all ResourceHealthMetadata for all sites in the resource group in the subscription. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ResourceHealthMetadataListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceHealthMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  options: ResourceHealthMetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/resourceHealthMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceHealthMetadataCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceHealthMetadataCollectionDeserializer(result.body);
}

/** Description for List all ResourceHealthMetadata for all sites in the subscription. */
export function list(
  context: Client,
  options: ResourceHealthMetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceHealthMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listBySiteSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: ResourceHealthMetadataListBySiteSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/resourceHealthMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listBySiteSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceHealthMetadataCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceHealthMetadataCollectionDeserializer(result.body);
}

/** Description for Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export function listBySiteSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: ResourceHealthMetadataListBySiteSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceHealthMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySiteSlotSend(context, resourceGroupName, name, slot, options),
    _listBySiteSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getBySiteSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: ResourceHealthMetadataGetBySiteSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/resourceHealthMetadata/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getBySiteSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceHealthMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return resourceHealthMetadataDeserializer(result.body);
}

/** Description for Gets the category of ResourceHealthMetadata to use for the given site */
export async function getBySiteSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: ResourceHealthMetadataGetBySiteSlotOptionalParams = { requestOptions: {} },
): Promise<ResourceHealthMetadata> {
  const result = await _getBySiteSlotSend(context, resourceGroupName, name, slot, options);
  return _getBySiteSlotDeserialize(result);
}

export function _listBySiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ResourceHealthMetadataListBySiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/resourceHealthMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listBySiteDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceHealthMetadataCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceHealthMetadataCollectionDeserializer(result.body);
}

/** Description for Gets the category of ResourceHealthMetadata to use for the given site as a collection */
export function listBySite(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ResourceHealthMetadataListBySiteOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceHealthMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySiteSend(context, resourceGroupName, name, options),
    _listBySiteDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getBySiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ResourceHealthMetadataGetBySiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/resourceHealthMetadata/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getBySiteDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceHealthMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return resourceHealthMetadataDeserializer(result.body);
}

/** Description for Gets the category of ResourceHealthMetadata to use for the given site */
export async function getBySite(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ResourceHealthMetadataGetBySiteOptionalParams = { requestOptions: {} },
): Promise<ResourceHealthMetadata> {
  const result = await _getBySiteSend(context, resourceGroupName, name, options);
  return _getBySiteDeserialize(result);
}
