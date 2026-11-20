// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayWorkspaceResource,
  AiGatewayWorkspaceUpdateParameters,
  _AiGatewayWorkspaceResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayWorkspaceResourceDeserializer,
  aiGatewayWorkspaceUpdateParametersSerializer,
  _aiGatewayWorkspaceResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayWorkspaceResourcesListByAiGatewayOptionalParams,
  AiGatewayWorkspaceResourcesUpdateOptionalParams,
  AiGatewayWorkspaceResourcesGetOptionalParams,
  AiGatewayWorkspaceResourcesCheckExistenceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAiGatewaySend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayWorkspaceResourcesListByAiGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
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

export async function _listByAiGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayWorkspaceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayWorkspaceResourceListResultDeserializer(result.body);
}

/** List AiGatewayWorkspaceResource resources by AiGatewayResource */
export function listByAiGateway(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayWorkspaceResourcesListByAiGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayWorkspaceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAiGatewaySend(context, resourceGroupName, aiGatewayName, options),
    _listByAiGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  ifMatch: string,
  properties: AiGatewayWorkspaceUpdateParameters,
  options: AiGatewayWorkspaceResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: aiGatewayWorkspaceUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayWorkspaceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayWorkspaceResourceDeserializer(result.body);
}

/** Update a AiGatewayWorkspaceResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  ifMatch: string,
  properties: AiGatewayWorkspaceUpdateParameters,
  options: AiGatewayWorkspaceResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayWorkspaceResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    ifMatch,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayWorkspaceResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayWorkspaceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayWorkspaceResourceDeserializer(result.body);
}

/** Get a AiGatewayWorkspaceResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayWorkspaceResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayWorkspaceResource> {
  const result = await _getSend(context, resourceGroupName, aiGatewayName, workspaceName, options);
  return _getDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayWorkspaceResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/workspaces/{workspaceName}{?api%2Dversion}",
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

/** Check for the existence of a AiGatewayWorkspaceResource */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  workspaceName: string,
  options: AiGatewayWorkspaceResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    aiGatewayName,
    workspaceName,
    options,
  );
  return _checkExistenceDeserialize(result);
}
