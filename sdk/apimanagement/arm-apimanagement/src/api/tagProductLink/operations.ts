// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { TagProductLinkContract, _TagProductLinkCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  tagProductLinkContractSerializer,
  tagProductLinkContractDeserializer,
  _tagProductLinkCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TagProductLinkListByProductOptionalParams,
  TagProductLinkDeleteOptionalParams,
  TagProductLinkCreateOrUpdateOptionalParams,
  TagProductLinkGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  options: TagProductLinkListByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}/productLinks{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByProductDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagProductLinkCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tagProductLinkCollectionDeserializer(result.body);
}

/** Lists a collection of the product links associated with a tag. */
export function listByProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  options: TagProductLinkListByProductOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagProductLinkContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProductSend(context, resourceGroupName, serviceName, tagId, options),
    _listByProductDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  productLinkId: string,
  options: TagProductLinkDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}/productLinks/{productLinkId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      productLinkId: productLinkId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified product from the specified tag. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  productLinkId: string,
  options: TagProductLinkDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    tagId,
    productLinkId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  productLinkId: string,
  parameters: TagProductLinkContract,
  options: TagProductLinkCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}/productLinks/{productLinkId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      productLinkId: productLinkId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagProductLinkContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TagProductLinkContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagProductLinkContractDeserializer(result.body);
}

/** Adds a product to the specified tag via link. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  productLinkId: string,
  parameters: TagProductLinkContract,
  options: TagProductLinkCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TagProductLinkContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    tagId,
    productLinkId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  productLinkId: string,
  options: TagProductLinkGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}/productLinks/{productLinkId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      productLinkId: productLinkId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<TagProductLinkContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagProductLinkContractDeserializer(result.body);
}

/** Gets the product link for the tag. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  productLinkId: string,
  options: TagProductLinkGetOptionalParams = { requestOptions: {} },
): Promise<TagProductLinkContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    tagId,
    productLinkId,
    options,
  );
  return _getDeserialize(result);
}
