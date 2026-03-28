// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  TagContract,
  _TagCollection,
  TagCreateUpdateParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  tagContractDeserializer,
  _tagCollectionDeserializer,
  tagCreateUpdateParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TagListByServiceOptionalParams,
  TagDeleteOptionalParams,
  TagUpdateOptionalParams,
  TagCreateOrUpdateOptionalParams,
  TagGetEntityStateOptionalParams,
  TagGetOptionalParams,
  TagListByProductOptionalParams,
  TagDetachFromProductOptionalParams,
  TagAssignToProductOptionalParams,
  TagGetEntityStateByProductOptionalParams,
  TagGetByProductOptionalParams,
  TagListByOperationOptionalParams,
  TagDetachFromOperationOptionalParams,
  TagAssignToOperationOptionalParams,
  TagGetEntityStateByOperationOptionalParams,
  TagGetByOperationOptionalParams,
  TagListByApiOptionalParams,
  TagDetachFromApiOptionalParams,
  TagAssignToApiOptionalParams,
  TagGetEntityStateByApiOptionalParams,
  TagGetByApiOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: TagListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags{?api%2Dversion,%24filter,%24top,%24skip,scope}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      scope: options?.scope,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tagCollectionDeserializer(result.body);
}

/** Lists a collection of tags defined within a service instance. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: TagListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, options),
    _listByServiceDeserialize,
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
  ifMatch: string,
  options: TagDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes specific tag of the API Management service instance. */
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
  ifMatch: string,
  options: TagDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    tagId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  ifMatch: string,
  parameters: TagCreateUpdateParameters,
  options: TagUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tagCreateUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<TagContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Updates the details of the tag specified by its identifier. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  ifMatch: string,
  parameters: TagCreateUpdateParameters,
  options: TagUpdateOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    tagId,
    ifMatch,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  parameters: TagCreateUpdateParameters,
  options: TagCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tagCreateUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TagContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Creates a tag. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  parameters: TagCreateUpdateParameters,
  options: TagCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    tagId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityStateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  options: TagGetEntityStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityStateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state version of the tag specified by its identifier. */
export async function getEntityState(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  options: TagGetEntityStateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityStateSend(context, resourceGroupName, serviceName, tagId, options);
  return _getEntityStateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  options: TagGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      tagId: tagId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TagContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Gets the details of the tag specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  tagId: string,
  options: TagGetOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, tagId, options);
  return _getDeserialize(result);
}

export function _listByProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  options: TagListByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/tags{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      productId: productId,
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
): Promise<_TagCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tagCollectionDeserializer(result.body);
}

/** Lists all Tags associated with the Product. */
export function listByProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  options: TagListByProductOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProductSend(context, resourceGroupName, serviceName, productId, options),
    _listByProductDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _detachFromProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagDetachFromProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      productId: productId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _detachFromProductDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Detach the tag from the Product. */
export async function detachFromProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagDetachFromProductOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _detachFromProductSend(
    context,
    resourceGroupName,
    serviceName,
    productId,
    tagId,
    options,
  );
  return _detachFromProductDeserialize(result);
}

export function _assignToProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagAssignToProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      productId: productId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _assignToProductDeserialize(
  result: PathUncheckedResponse,
): Promise<TagContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Assign tag to the Product. */
export async function assignToProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagAssignToProductOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _assignToProductSend(
    context,
    resourceGroupName,
    serviceName,
    productId,
    tagId,
    options,
  );
  return _assignToProductDeserialize(result);
}

export function _getEntityStateByProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagGetEntityStateByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      productId: productId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityStateByProductDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state version of the tag specified by its identifier. */
export async function getEntityStateByProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagGetEntityStateByProductOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityStateByProductSend(
    context,
    resourceGroupName,
    serviceName,
    productId,
    tagId,
    options,
  );
  return _getEntityStateByProductDeserialize(result);
}

export function _getByProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagGetByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      productId: productId,
      tagId: tagId,
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

export async function _getByProductDeserialize(
  result: PathUncheckedResponse,
): Promise<TagContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Get tag associated with the Product. */
export async function getByProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  productId: string,
  tagId: string,
  options: TagGetByProductOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _getByProductSend(
    context,
    resourceGroupName,
    serviceName,
    productId,
    tagId,
    options,
  );
  return _getByProductDeserialize(result);
}

export function _listByOperationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  options: TagListByOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/tags{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      operationId: operationId,
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

export async function _listByOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tagCollectionDeserializer(result.body);
}

/** Lists all Tags associated with the Operation. */
export function listByOperation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  options: TagListByOperationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagContract> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByOperationSend(context, resourceGroupName, serviceName, apiId, operationId, options),
    _listByOperationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _detachFromOperationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagDetachFromOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      operationId: operationId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _detachFromOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Detach the tag from the Operation. */
export async function detachFromOperation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagDetachFromOperationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _detachFromOperationSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    tagId,
    options,
  );
  return _detachFromOperationDeserialize(result);
}

export function _assignToOperationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagAssignToOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      operationId: operationId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _assignToOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<TagContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Assign tag to the Operation. */
export async function assignToOperation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagAssignToOperationOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _assignToOperationSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    tagId,
    options,
  );
  return _assignToOperationDeserialize(result);
}

export function _getEntityStateByOperationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagGetEntityStateByOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      operationId: operationId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityStateByOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state version of the tag specified by its identifier. */
export async function getEntityStateByOperation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagGetEntityStateByOperationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityStateByOperationSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    tagId,
    options,
  );
  return _getEntityStateByOperationDeserialize(result);
}

export function _getByOperationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagGetByOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      operationId: operationId,
      tagId: tagId,
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

export async function _getByOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<TagContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Get tag associated with the Operation. */
export async function getByOperation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  operationId: string,
  tagId: string,
  options: TagGetByOperationOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _getByOperationSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    tagId,
    options,
  );
  return _getByOperationDeserialize(result);
}

export function _listByApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: TagListByApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tags{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
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

export async function _listByApiDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tagCollectionDeserializer(result.body);
}

/** Lists all Tags associated with the API. */
export function listByApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: TagListByApiOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByApiSend(context, resourceGroupName, serviceName, apiId, options),
    _listByApiDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _detachFromApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagDetachFromApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _detachFromApiDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Detach the tag from the Api. */
export async function detachFromApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagDetachFromApiOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _detachFromApiSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    tagId,
    options,
  );
  return _detachFromApiDeserialize(result);
}

export function _assignToApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagAssignToApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _assignToApiDeserialize(result: PathUncheckedResponse): Promise<TagContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Assign tag to the Api. */
export async function assignToApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagAssignToApiOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _assignToApiSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    tagId,
    options,
  );
  return _assignToApiDeserialize(result);
}

export function _getEntityStateByApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagGetEntityStateByApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      tagId: tagId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityStateByApiDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state version of the tag specified by its identifier. */
export async function getEntityStateByApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagGetEntityStateByApiOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityStateByApiSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    tagId,
    options,
  );
  return _getEntityStateByApiDeserialize(result);
}

export function _getByApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagGetByApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tags/{tagId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      tagId: tagId,
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

export async function _getByApiDeserialize(result: PathUncheckedResponse): Promise<TagContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tagContractDeserializer(result.body);
}

/** Get tag associated with the API. */
export async function getByApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  tagId: string,
  options: TagGetByApiOptionalParams = { requestOptions: {} },
): Promise<TagContract> {
  const result = await _getByApiSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    tagId,
    options,
  );
  return _getByApiDeserialize(result);
}
