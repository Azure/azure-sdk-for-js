// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { ToolContract, _ToolCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  toolContractSerializer,
  toolContractDeserializer,
  _toolCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApiToolListByApiOptionalParams,
  ApiToolDeleteOptionalParams,
  ApiToolUpdateOptionalParams,
  ApiToolCreateOrUpdateOptionalParams,
  ApiToolGetEntityTagOptionalParams,
  ApiToolGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: ApiToolListByApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tools{?api%2Dversion,%24filter,%24top,%24skip}",
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
): Promise<_ToolCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _toolCollectionDeserializer(result.body);
}

/** Lists a collection of the MCP tools for the specified API. */
export function listByApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: ApiToolListByApiOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolContract> {
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

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  options: ApiToolDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tools/{toolId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      toolId: toolId,
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

/** Deletes the specified tool in the API. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  options: ApiToolDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    toolId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  parameters: ToolContract,
  options: ApiToolUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tools/{toolId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      toolId: toolId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: toolContractSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ToolContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return toolContractDeserializer(result.body);
}

/** Updates the details of the tool in the API specified by its identifier. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  parameters: ToolContract,
  options: ApiToolUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    toolId,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  parameters: ToolContract,
  options: ApiToolCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tools/{toolId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      toolId: toolId,
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
    body: toolContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ToolContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return toolContractDeserializer(result.body);
}

/** Creates a new tool in the API or updates an existing one. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  parameters: ToolContract,
  options: ApiToolCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    toolId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  options: ApiToolGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tools/{toolId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      toolId: toolId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the API tool specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  options: ApiToolGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    toolId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  options: ApiToolGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tools/{toolId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      toolId: toolId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ToolContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return toolContractDeserializer(result.body);
}

/** Gets the details of the API Tool specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  toolId: string,
  options: ApiToolGetOptionalParams = { requestOptions: {} },
): Promise<ToolContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, apiId, toolId, options);
  return _getDeserialize(result);
}
