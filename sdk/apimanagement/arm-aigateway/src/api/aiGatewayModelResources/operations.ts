// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayModelResource,
  AiGatewayModelUpdateParameters,
  _AiGatewayModelResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayModelResourceSerializer,
  aiGatewayModelResourceDeserializer,
  aiGatewayModelUpdateParametersSerializer,
  _aiGatewayModelResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayModelResourcesListByModelProviderOptionalParams,
  AiGatewayModelResourcesDeleteOptionalParams,
  AiGatewayModelResourcesUpdateOptionalParams,
  AiGatewayModelResourcesCreateOrUpdateOptionalParams,
  AiGatewayModelResourcesGetOptionalParams,
  AiGatewayModelResourcesCheckExistenceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByModelProviderSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  options: AiGatewayModelResourcesListByModelProviderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/models{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      modelProviderName: modelProviderName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _listByModelProviderDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayModelResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayModelResourceListResultDeserializer(result.body);
}

/** List AiGatewayModelResource resources by AiGatewayModelProviderResource */
export function listByModelProvider(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  options: AiGatewayModelResourcesListByModelProviderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayModelResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByModelProviderSend(
        context,
        resourceGroupName,
        aiGatewayName,
        workspaceName,
        modelProviderName,
        options,
      ),
    _listByModelProviderDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  ifMatch: string,
  options: AiGatewayModelResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/models/{modelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      modelProviderName: modelProviderName,
      modelName: modelName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a AiGatewayModelResource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  ifMatch: string,
  options: AiGatewayModelResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    modelName,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  ifMatch: string,
  properties: AiGatewayModelUpdateParameters,
  options: AiGatewayModelResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/models/{modelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      modelProviderName: modelProviderName,
      modelName: modelName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
    body: aiGatewayModelUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayModelResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelResourceDeserializer(result.body);
}

/** Update a AiGatewayModelResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  ifMatch: string,
  properties: AiGatewayModelUpdateParameters,
  options: AiGatewayModelResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    modelName,
    ifMatch,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  resource: AiGatewayModelResource,
  options: AiGatewayModelResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/models/{modelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      modelProviderName: modelProviderName,
      modelName: modelName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: aiGatewayModelResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayModelResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelResourceDeserializer(result.body);
}

/** Create a AiGatewayModelResource */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  resource: AiGatewayModelResource,
  options: AiGatewayModelResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    modelName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  options: AiGatewayModelResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/models/{modelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      modelProviderName: modelProviderName,
      modelName: modelName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
): Promise<AiGatewayModelResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelResourceDeserializer(result.body);
}

/** Get a AiGatewayModelResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  options: AiGatewayModelResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    modelName,
    options,
  );
  return _getDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  options: AiGatewayModelResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/models/{modelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      modelProviderName: modelProviderName,
      modelName: modelName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Check for the existence of a AiGatewayModelResource */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  modelName: string,
  options: AiGatewayModelResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    modelName,
    options,
  );
  return _checkExistenceDeserialize(result);
}
