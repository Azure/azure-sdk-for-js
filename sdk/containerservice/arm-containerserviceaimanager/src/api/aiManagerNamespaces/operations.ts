// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  CredentialResults,
  AIManagerNamespace,
  _AIManagerNamespaceListResult,
  NamespaceAccessInfo,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  credentialResultsDeserializer,
  aiManagerNamespaceSerializer,
  aiManagerNamespaceDeserializer,
  _aiManagerNamespaceListResultDeserializer,
  namespaceAccessInfoDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AIManagerNamespacesRotateKeysOptionalParams,
  AIManagerNamespacesListAccessKeysOptionalParams,
  AIManagerNamespacesListCredentialOptionalParams,
  AIManagerNamespacesListByAIManagerOptionalParams,
  AIManagerNamespacesDeleteOptionalParams,
  AIManagerNamespacesCreateOrUpdateOptionalParams,
  AIManagerNamespacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _rotateKeysSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesRotateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/rotateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _rotateKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceAccessInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return namespaceAccessInfoDeserializer(result.body);
}
/** Rotates the namespace-scoped LLM gateway API keys. A new key is generated and installed as `primaryKey`, and the previous `primaryKey` overwrites `secondaryKey` so clients can roll over without downtime. Returns the updated access info. */
export async function rotateKeys(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesRotateKeysOptionalParams = { requestOptions: {} },
): Promise<NamespaceAccessInfo> {
  const result = await _rotateKeysSend(
    context,
    resourceGroupName,
    aiManagerName,
    namespaceName,
    options,
  );
  return _rotateKeysDeserialize(result);
}

export function _listAccessKeysSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesListAccessKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/listAccessKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _listAccessKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceAccessInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return namespaceAccessInfoDeserializer(result.body);
}
/** Returns the namespace-scoped LLM gateway endpoint and the current API keys. */
export async function listAccessKeys(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesListAccessKeysOptionalParams = { requestOptions: {} },
): Promise<NamespaceAccessInfo> {
  const result = await _listAccessKeysSend(
    context,
    resourceGroupName,
    aiManagerName,
    namespaceName,
    options,
  );
  return _listAccessKeysDeserialize(result);
}

export function _listCredentialSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesListCredentialOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/listCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _listCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<CredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return credentialResultsDeserializer(result.body);
}
/** Lists the credentials of an AI Manager namespace. */
export async function listCredential(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesListCredentialOptionalParams = { requestOptions: {} },
): Promise<CredentialResults> {
  const result = await _listCredentialSend(
    context,
    resourceGroupName,
    aiManagerName,
    namespaceName,
    options,
  );
  return _listCredentialDeserialize(result);
}

export function _listByAIManagerSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  options: AIManagerNamespacesListByAIManagerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _listByAIManagerDeserialize(
  result: PathUncheckedResponse,
): Promise<_AIManagerNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiManagerNamespaceListResultDeserializer(result.body);
}
/** List AIManagerNamespace resources by AIManager */
export function listByAIManager(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  options: AIManagerNamespacesListByAIManagerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AIManagerNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAIManagerSend(context, resourceGroupName, aiManagerName, options),
    _listByAIManagerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Delete a AIManagerNamespace */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, aiManagerName, namespaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  resource: AIManagerNamespace,
  options: AIManagerNamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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
    body: aiManagerNamespaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AIManagerNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiManagerNamespaceDeserializer(result.body);
}
/** Create a AIManagerNamespace */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  resource: AIManagerNamespace,
  options: AIManagerNamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AIManagerNamespace>, AIManagerNamespace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        aiManagerName,
        namespaceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-02-preview",
  }) as PollerLike<OperationState<AIManagerNamespace>, AIManagerNamespace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AIManagerNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiManagerNamespaceDeserializer(result.body);
}
/** Get a AIManagerNamespace */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: AIManagerNamespacesGetOptionalParams = { requestOptions: {} },
): Promise<AIManagerNamespace> {
  const result = await _getSend(context, resourceGroupName, aiManagerName, namespaceName, options);
  return _getDeserialize(result);
}
