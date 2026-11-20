// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayApiKeyResource,
  AiGatewayApiKeyUpdateParameters,
  _AiGatewayApiKeyResourceListResult,
  AiGatewayApiKeyValues,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayApiKeyResourceSerializer,
  aiGatewayApiKeyResourceDeserializer,
  aiGatewayApiKeyUpdateParametersSerializer,
  _aiGatewayApiKeyResourceListResultDeserializer,
  aiGatewayApiKeyValuesDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams,
  AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams,
  AiGatewayApiKeyResourcesListSecretsOptionalParams,
  AiGatewayApiKeyResourcesListByAiGatewayOptionalParams,
  AiGatewayApiKeyResourcesDeleteOptionalParams,
  AiGatewayApiKeyResourcesUpdateOptionalParams,
  AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams,
  AiGatewayApiKeyResourcesGetOptionalParams,
  AiGatewayApiKeyResourcesCheckExistenceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _regenerateSecondaryKeySend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}/regenerateSecondaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regenerateSecondaryKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Regenerates the secondary API key value. */
export async function regenerateSecondaryKey(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regenerateSecondaryKeySend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
    options,
  );
  return _regenerateSecondaryKeyDeserialize(result);
}

export function _regeneratePrimaryKeySend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}/regeneratePrimaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regeneratePrimaryKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Regenerates the primary API key value. */
export async function regeneratePrimaryKey(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regeneratePrimaryKeySend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
    options,
  );
  return _regeneratePrimaryKeyDeserialize(result);
}

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
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
): Promise<AiGatewayApiKeyValues> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayApiKeyValuesDeserializer(result.body);
}

/** Returns primary and secondary key values. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesListSecretsOptionalParams = { requestOptions: {} },
): Promise<AiGatewayApiKeyValues> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listByAiGatewaySend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayApiKeyResourcesListByAiGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys{?api%2Dversion}",
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
): Promise<_AiGatewayApiKeyResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayApiKeyResourceListResultDeserializer(result.body);
}

/** List AiGatewayApiKeyResource resources by AiGatewayResource */
export function listByAiGateway(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayApiKeyResourcesListByAiGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayApiKeyResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAiGatewaySend(context, resourceGroupName, aiGatewayName, options),
    _listByAiGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  ifMatch: string,
  options: AiGatewayApiKeyResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
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

/** Delete a AiGatewayApiKeyResource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  ifMatch: string,
  options: AiGatewayApiKeyResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  ifMatch: string,
  properties: AiGatewayApiKeyUpdateParameters,
  options: AiGatewayApiKeyResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
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
    body: aiGatewayApiKeyUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayApiKeyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayApiKeyResourceDeserializer(result.body);
}

/** Update a AiGatewayApiKeyResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  ifMatch: string,
  properties: AiGatewayApiKeyUpdateParameters,
  options: AiGatewayApiKeyResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayApiKeyResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
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
  apiKeyName: string,
  resource: AiGatewayApiKeyResource,
  options: AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
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
    body: aiGatewayApiKeyResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayApiKeyResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayApiKeyResourceDeserializer(result.body);
}

/** Create a AiGatewayApiKeyResource */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  resource: AiGatewayApiKeyResource,
  options: AiGatewayApiKeyResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGatewayApiKeyResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
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
): Promise<AiGatewayApiKeyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayApiKeyResourceDeserializer(result.body);
}

/** Get a AiGatewayApiKeyResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayApiKeyResource> {
  const result = await _getSend(context, resourceGroupName, aiGatewayName, apiKeyName, options);
  return _getDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/apiKeys/{apiKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      apiKeyName: apiKeyName,
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

/** Check for the existence of a AiGatewayApiKeyResource */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  apiKeyName: string,
  options: AiGatewayApiKeyResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    aiGatewayName,
    apiKeyName,
    options,
  );
  return _checkExistenceDeserialize(result);
}
