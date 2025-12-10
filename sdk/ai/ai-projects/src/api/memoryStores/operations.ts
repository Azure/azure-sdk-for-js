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
  itemParamUnionArraySerializer,
  MemoryStoreSearchResponse,
  memoryStoreSearchResponseDeserializer,
  MemoryStoreUpdateResponse,
  memoryStoreUpdateResponseDeserializer,
  MemoryStoreDeleteScopeResponse,
  memoryStoreDeleteScopeResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  createMemoryStoreUpdateMemoriesPoller,
  MemoryStoreUpdateMemoriesPoller,
} from "./memoryStoreUpdateMemoriesPoller.js";
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

export function _deleteScopeSend(
  context: Client,
  name: string,
  scope: string,
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
  options: MemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreDeleteScopeResponse> {
  const result = await _deleteScopeSend(context, name, scope, options);
  return _deleteScopeDeserialize(result);
}

export function _getUpdateResultSend(
  context: Client,
  name: string,
  updateId: string,
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
  options: MemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreUpdateResponse> {
  const result = await _getUpdateResultSend(context, name, updateId, options);
  return _getUpdateResultDeserialize(result);
}

export function _updateMemoriesSend(
  context: Client,
  name: string,
  scope: string,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      scope: scope,
      conversation_id: options?.conversationId,
      items: !options?.items ? options?.items : itemParamUnionArraySerializer(options?.items),
      previous_update_id: options?.previousUpdateId,
      update_delay: options?.updateDelay,
    },
  });
}

/** Update memory store with conversation memories. */
export function updateMemories(
  context: Client,
  name: string,
  scope: string,
  options: MemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): MemoryStoreUpdateMemoriesPoller {
  return createMemoryStoreUpdateMemoriesPoller(
    context,
    ["202", "200"],
    () => _updateMemoriesSend(context, name, scope, options),
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
    },
  );
}

export function _searchMemoriesSend(
  context: Client,
  name: string,
  scope: string,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      scope: scope,
      conversation_id: options?.conversationId,
      items: !options?.items ? options?.items : itemParamUnionArraySerializer(options?.items),
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
  options: MemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreSearchResponse> {
  const result = await _searchMemoriesSend(context, name, scope, options);
  return _searchMemoriesDeserialize(result);
}

export function _deleteMemoryStoreSend(
  context: Client,
  name: string,
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
  options: MemoryStoresDeleteMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryStoreResponse> {
  const result = await _deleteMemoryStoreSend(context, name, options);
  return _deleteMemoryStoreDeserialize(result);
}

export function _listMemoryStoresSend(
  context: Client,
  options: MemoryStoresListMemoryStoresOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores{?api-version,limit,order,after,before}",
    {
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
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
  options: MemoryStoresListMemoryStoresOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listMemoryStoresSend(context, options),
    _listMemoryStoresDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _getMemoryStoreSend(
  context: Client,
  name: string,
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
  options: MemoryStoresGetMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _getMemoryStoreSend(context, name, options);
  return _getMemoryStoreDeserialize(result);
}

export function _updateMemoryStoreSend(
  context: Client,
  name: string,
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
  options: MemoryStoresUpdateMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _updateMemoryStoreSend(context, name, options);
  return _updateMemoryStoreDeserialize(result);
}

export function _createMemoryStoreSend(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
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
  options: MemoryStoresCreateMemoryStoreOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _createMemoryStoreSend(context, name, definition, options);
  return _createMemoryStoreDeserialize(result);
}
