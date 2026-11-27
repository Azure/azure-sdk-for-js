// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayAliasResource,
  AiGatewayAliasUpdateParameters,
  _AiGatewayAliasResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayAliasResourceSerializer,
  aiGatewayAliasResourceDeserializer,
  aiGatewayAliasUpdateParametersSerializer,
  _aiGatewayAliasResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayAliasResourcesListByWorkspaceOptionalParams,
  AiGatewayAliasResourcesDeleteOptionalParams,
  AiGatewayAliasResourcesUpdateOptionalParams,
  AiGatewayAliasResourcesCreateOrUpdateOptionalParams,
  AiGatewayAliasResourcesGetOptionalParams,
  AiGatewayAliasResourcesCheckExistenceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayAliasResourcesListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/aliases{?api%2Dversion}",
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
): Promise<_AiGatewayAliasResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayAliasResourceListResultDeserializer(result.body);
}

/** List AiGatewayAliasResource resources by AiGatewayWorkspaceResource */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayAliasResourcesListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayAliasResource> {
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
  aliasId: string,
  ifMatch: string,
  options: AiGatewayAliasResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/aliases/{aliasId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      aliasId: aliasId,
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

/** Delete a AiGatewayAliasResource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  aliasId: string,
  ifMatch: string,
  options: AiGatewayAliasResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    aliasId,
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
  aliasId: string,
  ifMatch: string,
  properties: AiGatewayAliasUpdateParameters,
  options: AiGatewayAliasResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/aliases/{aliasId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      aliasId: aliasId,
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
    body: aiGatewayAliasUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayAliasResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayAliasResourceDeserializer(result.body);
}

/** Update a AiGatewayAliasResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  aliasId: string,
  ifMatch: string,
  properties: AiGatewayAliasUpdateParameters,
  options: AiGatewayAliasResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayAliasResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    aliasId,
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
  aliasId: string,
  resource: AiGatewayAliasResource,
  options: AiGatewayAliasResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/aliases/{aliasId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      aliasId: aliasId,
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
    body: aiGatewayAliasResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayAliasResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayAliasResourceDeserializer(result.body);
}

/** Create a AiGatewayAliasResource */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  aliasId: string,
  resource: AiGatewayAliasResource,
  options: AiGatewayAliasResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayAliasResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    aliasId,
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
  aliasId: string,
  options: AiGatewayAliasResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/aliases/{aliasId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      aliasId: aliasId,
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
): Promise<AiGatewayAliasResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayAliasResourceDeserializer(result.body);
}

/** Get a AiGatewayAliasResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  aliasId: string,
  options: AiGatewayAliasResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayAliasResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    aliasId,
    options,
  );
  return _getDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  aliasId: string,
  options: AiGatewayAliasResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}/aliases/{aliasId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      workspaceName: workspaceName,
      aliasId: aliasId,
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

/** Check for the existence of a AiGatewayAliasResource */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  aliasId: string,
  options: AiGatewayAliasResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    aliasId,
    options,
  );
  return _checkExistenceDeserialize(result);
}
