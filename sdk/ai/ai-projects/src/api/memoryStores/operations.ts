// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  memorySearchOptionsSerializer,
  apiErrorResponseDeserializer,
  memoryStoreDefinitionUnionSerializer,
  MemoryStoreDefinitionUnion,
  MemoryStore,
  memoryStoreObjectDeserializer,
  _AgentsPagedResultMemoryStore,
  _agentsPagedResultMemoryStoreObjectDeserializer,
  DeleteMemoryStoreResponse,
  deleteMemoryStoreResponseDeserializer,
  inputItemUnionArraySerializer,
  MemoryStoreSearchResponse,
  memoryStoreSearchResponseDeserializer,
  MemoryStoreUpdateResponse,
  memoryStoreUpdateResponseDeserializer,
  MemoryStoreUpdateCompletedResult,
  memoryStoreUpdateCompletedResultDeserializer,
  MemoryStoreDeleteScopeResponse,
  memoryStoreDeleteScopeResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MemoryStoresDeleteScopeOptionalParams,
  MemoryStoresGetUpdateResultOptionalParams,
  MemoryStoresUpdateMemoriesOptionalParams,
  MemoryStoresSearchMemoriesOptionalParams,
  MemoryStoresDeleteMemoryStoreOptionalParams,
  MemoryStoresListMemoryStoresOptionalParams,
  MemoryStoresGetMemoryStoreOptionalParams,
  MemoryStoresUpdateMemoryStoreOptionalParams,
  MemoryStoresCreateMemoryStoreOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteScopeSend(
  context: Client,
  name: string,
  scope: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}:delete_scope{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { scope: scope },
  });
}

export async function _deleteScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreDeleteScopeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreDeleteScopeResponseDeserializer(result.body);
}

/** Delete all memories associated with a specific scope from a memory store. */
export async function deleteScope(
  context: Client,
  name: string,
  scope: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreDeleteScopeResponse> {
  const result = await _deleteScopeSend(context, name, scope, foundryFeatures, options);
  return _deleteScopeDeserialize(result);
}

export function _getUpdateResultSend(
  context: Client,
  name: string,
  updateId: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/updates/{update_id}{?api-version}",
    {
      name: name,
      update_id: updateId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getUpdateResultDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreUpdateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreUpdateResponseDeserializer(result.body);
}

/** Get memory store update result. */
export async function getUpdateResult(
  context: Client,
  name: string,
  updateId: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreUpdateResponse> {
  const result = await _getUpdateResultSend(context, name, updateId, foundryFeatures, options);
  return _getUpdateResultDeserialize(result);
}

export function _updateMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}:update_memories{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      scope: scope,
      items: !options?.items ? options?.items : inputItemUnionArraySerializer(options?.items),
      previous_update_id: options?.previousUpdateId,
      update_delay: options?.updateDelay,
    },
  });
}

export async function _updateMemoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreUpdateCompletedResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return memoryStoreUpdateCompletedResultDeserializer(result.body.result);
}

/** Update memory store with conversation memories. */
export function updateMemories(
  context: Client,
  name: string,
  scope: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MemoryStoreUpdateCompletedResult>, MemoryStoreUpdateCompletedResult> {
  return getLongRunningPoller(context, _updateMemoriesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateMemoriesSend(context, name, scope, foundryFeatures, options),

    apiVersion: context.apiVersion,
  }) as PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
}

export function _searchMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}:search_memories{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      scope: scope,
      items: !options?.items ? options?.items : inputItemUnionArraySerializer(options?.items),
      previous_search_id: options?.previousSearchId,
      options: !options?.options
        ? options?.options
        : memorySearchOptionsSerializer(options?.options),
    },
  });
}

export async function _searchMemoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreSearchResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreSearchResponseDeserializer(result.body);
}

/** Search for relevant memories from a memory store based on conversation context. */
export async function searchMemories(
  context: Client,
  name: string,
  scope: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreSearchResponse> {
  const result = await _searchMemoriesSend(context, name, scope, foundryFeatures, options);
  return _searchMemoriesDeserialize(result);
}

export function _deleteMemoryStoreSend(
  context: Client,
  name: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresDeleteMemoryStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteMemoryStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteMemoryStoreResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return deleteMemoryStoreResponseDeserializer(result.body);
}

/** Delete a memory store. */
export async function deleteMemoryStore(
  context: Client,
  name: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresDeleteMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryStoreResponse> {
  const result = await _deleteMemoryStoreSend(context, name, foundryFeatures, options);
  return _deleteMemoryStoreDeserialize(result);
}

export function _listMemoryStoresSend(
  context: Client,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresListMemoryStoresOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores{?limit,order,after,before,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listMemoryStoresDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultMemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultMemoryStoreObjectDeserializer(result.body);
}

/** List all memory stores. */
export function listMemoryStores(
  context: Client,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresListMemoryStoresOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listMemoryStoresSend(context, foundryFeatures, options),
    _listMemoryStoresDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _getMemoryStoreSend(
  context: Client,
  name: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresGetMemoryStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getMemoryStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreObjectDeserializer(result.body);
}

/** Retrieve a memory store. */
export async function getMemoryStore(
  context: Client,
  name: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresGetMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _getMemoryStoreSend(context, name, foundryFeatures, options);
  return _getMemoryStoreDeserialize(result);
}

export function _updateMemoryStoreSend(
  context: Client,
  name: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresUpdateMemoryStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { description: options?.description, metadata: options?.metadata },
  });
}

export async function _updateMemoryStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreObjectDeserializer(result.body);
}

/** Update a memory store. */
export async function updateMemoryStore(
  context: Client,
  name: string,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresUpdateMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _updateMemoryStoreSend(context, name, foundryFeatures, options);
  return _updateMemoryStoreDeserialize(result);
}

export function _createMemoryStoreSend(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresCreateMemoryStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      name: name,
      description: options?.description,
      metadata: options?.metadata,
      definition: memoryStoreDefinitionUnionSerializer(definition),
    },
  });
}

export async function _createMemoryStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreObjectDeserializer(result.body);
}

/** Create a memory store. */
export async function createMemoryStore(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
  foundryFeatures: string | "MemoryStores=V1Preview",
  options: MemoryStoresCreateMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _createMemoryStoreSend(context, name, definition, foundryFeatures, options);
  return _createMemoryStoreDeserialize(result);
}
