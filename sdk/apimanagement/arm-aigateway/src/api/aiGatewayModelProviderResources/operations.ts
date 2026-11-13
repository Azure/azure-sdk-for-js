// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayModelProviderResource,
  AiGatewayModelProviderUpdateParameters,
  _AiGatewayModelProviderResourceListResult,
  AiGatewayModelProviderSecrets,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayModelProviderResourceSerializer,
  aiGatewayModelProviderResourceDeserializer,
  aiGatewayModelProviderUpdateParametersSerializer,
  _aiGatewayModelProviderResourceListResultDeserializer,
  aiGatewayModelProviderSecretsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayModelProviderResourcesListSecretsOptionalParams,
  AiGatewayModelProviderResourcesListByWorkspaceOptionalParams,
  AiGatewayModelProviderResourcesDeleteOptionalParams,
  AiGatewayModelProviderResourcesUpdateOptionalParams,
  AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams,
  AiGatewayModelProviderResourcesGetOptionalParams,
  AiGatewayModelProviderResourcesCheckExistenceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  options: AiGatewayModelProviderResourcesListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}/listSecrets{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayModelProviderSecrets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelProviderSecretsDeserializer(result.body);
}

/** Returns the stored model-provider authentication configuration, including secret values. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  options: AiGatewayModelProviderResourcesListSecretsOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelProviderSecrets> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayModelProviderResourcesListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayModelProviderResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayModelProviderResourceListResultDeserializer(result.body);
}

/** List AiGatewayModelProviderResource resources by AiGatewayWorkspaceResource */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayModelProviderResourcesListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayModelProviderResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, aiGatewayName, workspaceName, options),
    _listByWorkspaceDeserialize,
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
  ifMatch: string,
  options: AiGatewayModelProviderResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}{?api%2Dversion}",
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

/** Delete a AiGatewayModelProviderResource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  ifMatch: string,
  options: AiGatewayModelProviderResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
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
  ifMatch: string,
  properties: AiGatewayModelProviderUpdateParameters,
  options: AiGatewayModelProviderResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: aiGatewayModelProviderUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayModelProviderResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelProviderResourceDeserializer(result.body);
}

/** Update a AiGatewayModelProviderResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  ifMatch: string,
  properties: AiGatewayModelProviderUpdateParameters,
  options: AiGatewayModelProviderResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelProviderResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
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
  resource: AiGatewayModelProviderResource,
  options: AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: aiGatewayModelProviderResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayModelProviderResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelProviderResourceDeserializer(result.body);
}

/** Create a AiGatewayModelProviderResource */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  resource: AiGatewayModelProviderResource,
  options: AiGatewayModelProviderResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelProviderResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
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
  options: AiGatewayModelProviderResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayModelProviderResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayModelProviderResourceDeserializer(result.body);
}

/** Get a AiGatewayModelProviderResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  options: AiGatewayModelProviderResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayModelProviderResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
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
  options: AiGatewayModelProviderResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/modelProviders/{modelProviderName}{?api%2Dversion}",
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

/** Check for the existence of a AiGatewayModelProviderResource */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  modelProviderName: string,
  options: AiGatewayModelProviderResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    modelProviderName,
    options,
  );
  return _checkExistenceDeserialize(result);
}
