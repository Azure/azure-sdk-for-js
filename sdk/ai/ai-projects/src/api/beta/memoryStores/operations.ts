// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  MemoryStoreDefinitionUnion,
  MemoryStore,
  _AgentsPagedResultMemoryStoreObject,
  DeleteMemoryStoreResponse,
  MemoryStoreSearchResponse,
  MemoryStoreUpdateResponse,
  MemoryStoreUpdateCompletedResult,
  MemoryStoreDeleteScopeResponse,
  MemoryStoreUpdateStatus,
  MemoryItemUnion,
  MemoryItemKind,
  _AgentsPagedResultMemoryItem,
  DeleteMemoryResponse,
} from "../../../models/models.js";
import {
  memorySearchOptionsSerializer,
  memoryItemUnionDeserializer,
  apiErrorResponseDeserializer,
  memoryStoreDefinitionUnionSerializer,
  memoryStoreDeserializer,
  _agentsPagedResultMemoryStoreObjectDeserializer,
  deleteMemoryStoreResponseDeserializer,
  memoryStoreSearchResponseDeserializer,
  memoryStoreUpdateResponseDeserializer,
  memoryStoreUpdateCompletedResultDeserializer,
  memoryStoreDeleteScopeResponseDeserializer,
  _agentsPagedResultMemoryItemDeserializer,
  deleteMemoryResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaMemoryStoresDeleteMemoryOptionalParams,
  BetaMemoryStoresListMemoriesOptionalParams,
  BetaMemoryStoresGetMemoryOptionalParams,
  BetaMemoryStoresUpdateMemoryOptionalParams,
  BetaMemoryStoresCreateMemoryOptionalParams,
  BetaMemoryStoresDeleteScopeOptionalParams,
  BetaMemoryStoresGetUpdateResultOptionalParams,
  BetaMemoryStoresUpdateMemoriesOptionalParams,
  BetaMemoryStoresSearchMemoriesOptionalParams,
  BetaMemoryStoresDeleteOptionalParams,
  BetaMemoryStoresListOptionalParams,
  BetaMemoryStoresGetOptionalParams,
  BetaMemoryStoresUpdateOptionalParams,
  BetaMemoryStoresCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState, OperationStatus } from "@azure/core-lro";

export function _deleteMemorySend(
  context: Client,
  name: string,
  memoryId: string,
  options: BetaMemoryStoresDeleteMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items/{memory_id}{?api-version}",
    {
      name: name,
      memory_id: memoryId,
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

export async function _deleteMemoryDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteMemoryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteMemoryResponseDeserializer(result.body);
}

/** Deletes the specified memory item from the memory store. */
export async function deleteMemory(
  context: Client,
  name: string,
  memoryId: string,
  options: BetaMemoryStoresDeleteMemoryOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryResponse> {
  const result = await _deleteMemorySend(context, name, memoryId, options);
  return _deleteMemoryDeserialize(result);
}

export function _listMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresListMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items:list{?kind,limit,order,after,before,api-version}",
    {
      name: name,
      kind: options?.kind,
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

export async function _listMemoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultMemoryItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultMemoryItemDeserializer(result.body);
}

/** Returns memory items from the specified memory store. */
export function listMemories(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresListMemoriesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listMemoriesSend(context, name, scope, options),
    _listMemoriesDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _getMemorySend(
  context: Client,
  name: string,
  memoryId: string,
  options: BetaMemoryStoresGetMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items/{memory_id}{?api-version}",
    {
      name: name,
      memory_id: memoryId,
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

export async function _getMemoryDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryItemUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryItemUnionDeserializer(result.body);
}

/** Retrieves the specified memory item from the memory store. */
export async function getMemory(
  context: Client,
  name: string,
  memoryId: string,
  options: BetaMemoryStoresGetMemoryOptionalParams = { requestOptions: {} },
): Promise<MemoryItemUnion> {
  const result = await _getMemorySend(context, name, memoryId, options);
  return _getMemoryDeserialize(result);
}

export function _updateMemorySend(
  context: Client,
  name: string,
  memoryId: string,
  content: string,
  options: BetaMemoryStoresUpdateMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items/{memory_id}{?api-version}",
    {
      name: name,
      memory_id: memoryId,
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
    body: { content: content },
  });
}

export async function _updateMemoryDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryItemUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryItemUnionDeserializer(result.body);
}

/** Updates the specified memory item in the memory store. */
export async function updateMemory(
  context: Client,
  name: string,
  memoryId: string,
  content: string,
  options: BetaMemoryStoresUpdateMemoryOptionalParams = { requestOptions: {} },
): Promise<MemoryItemUnion> {
  const result = await _updateMemorySend(context, name, memoryId, content, options);
  return _updateMemoryDeserialize(result);
}

export function _createMemorySend(
  context: Client,
  name: string,
  scope: string,
  content: string,
  kind: MemoryItemKind,
  options: BetaMemoryStoresCreateMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items{?api-version}",
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
    body: { scope: scope, content: content, kind: kind },
  });
}

export async function _createMemoryDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryItemUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryItemUnionDeserializer(result.body);
}

/** Creates a memory item in the specified memory store. */
export async function createMemory(
  context: Client,
  name: string,
  scope: string,
  content: string,
  kind: MemoryItemKind,
  options: BetaMemoryStoresCreateMemoryOptionalParams = { requestOptions: {} },
): Promise<MemoryItemUnion> {
  const result = await _createMemorySend(context, name, scope, content, kind, options);
  return _createMemoryDeserialize(result);
}

export function _deleteScopeSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryStoreDeleteScopeResponseDeserializer(result.body);
}

/** Deletes all memories in the specified memory store that are associated with the provided scope. */
export async function deleteScope(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreDeleteScopeResponse> {
  const result = await _deleteScopeSend(context, name, scope, options);
  return _deleteScopeDeserialize(result);
}

export function _getUpdateResultSend(
  context: Client,
  name: string,
  updateId: string,
  options: BetaMemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryStoreUpdateResponseDeserializer(result.body);
}

/** Retrieves the status and result of a memory store update operation. */
export async function getUpdateResult(
  context: Client,
  name: string,
  updateId: string,
  options: BetaMemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreUpdateResponse> {
  const result = await _getUpdateResultSend(context, name, updateId, options);
  return _getUpdateResultDeserialize(result);
}

export function _updateMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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
      items: !options?.items
        ? options?.items
        : options?.items.map((p: any) => {
            return p;
          }),
      previous_update_id: options?.previousUpdateId,
      update_delay: options?.updateDelayInSecs,
    },
  });
}

export async function _updateMemoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreUpdateCompletedResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

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

/**
 * Starts an update that writes conversation memories into the specified memory store.
 * The operation returns a long-running status location for polling the update result.
 */
export function updateMemories(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MemoryStoreUpdateCompletedResult>, MemoryStoreUpdateCompletedResult> {
  return getLongRunningPoller(context, _updateMemoriesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateMemoriesSend(context, name, scope, options),
    apiVersion: context.apiVersion,
    pollHeaders: {
      ...options?.requestOptions?.headers,
      "foundry-features": "MemoryStores=V1Preview",
    },
    statusNormalizations: {
      queued: "running",
      in_progress: "running",
      completed: "succeeded",
      failed: "failed",
      superseded: "canceled",
    } satisfies Record<MemoryStoreUpdateStatus, OperationStatus>,
  }) as PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
}

export function _searchMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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
      items: !options?.items
        ? options?.items
        : options?.items.map((p: any) => {
            return p;
          }),
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryStoreSearchResponseDeserializer(result.body);
}

/** Searches the specified memory store for memories relevant to the provided conversation context. */
export async function searchMemories(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreSearchResponse> {
  const result = await _searchMemoriesSend(context, name, scope, options);
  return _searchMemoriesDeserialize(result);
}

export function _deleteSend(
  context: Client,
  name: string,
  options: BetaMemoryStoresDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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

export async function _deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteMemoryStoreResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteMemoryStoreResponseDeserializer(result.body);
}

/** Deletes the specified memory store. */
export async function $delete(
  context: Client,
  name: string,
  options: BetaMemoryStoresDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryStoreResponse> {
  const result = await _deleteSend(context, name, options);
  return _deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaMemoryStoresListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultMemoryStoreObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultMemoryStoreObjectDeserializer(result.body);
}

/** Returns the memory stores available to the caller. */
export function list(
  context: Client,
  options: BetaMemoryStoresListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "MemoryStores=V1Preview",
        },
      },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: BetaMemoryStoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Retrieves the specified memory store and its current configuration. */
export async function get(
  context: Client,
  name: string,
  options: BetaMemoryStoresGetOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  options: BetaMemoryStoresUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Updates the specified memory store with the supplied configuration changes. */
export async function update(
  context: Client,
  name: string,
  options: BetaMemoryStoresUpdateOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _updateSend(context, name, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
  options: BetaMemoryStoresCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
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

export async function _createDeserialize(result: PathUncheckedResponse): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Creates a memory store resource with the provided configuration. */
export async function create(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
  options: BetaMemoryStoresCreateOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _createSend(context, name, definition, options);
  return _createDeserialize(result);
}
