// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  memorySearchOptionsSerializer,
  apiErrorResponseDeserializer,
  memoryStoreDefinitionUnionSerializer,
  MemoryStoreDefinitionUnion,
  MemoryStore,
  memoryStoreDeserializer,
  _AgentsPagedResultMemoryStoreObject,
  _agentsPagedResultMemoryStoreObjectDeserializer,
  DeleteMemoryStoreResponse,
  deleteMemoryStoreResponseDeserializer,
  MemoryStoreSearchResponse,
  memoryStoreSearchResponseDeserializer,
  memoryItemUnionDeserializer,
  MemoryItemUnion,
  MemoryItemKind,
  MemoryStoreUpdateResponse,
  memoryStoreUpdateResponseDeserializer,
  MemoryStoreUpdateCompletedResult,
  memoryStoreUpdateCompletedResultDeserializer,
  MemoryStoreDeleteScopeResponse,
  memoryStoreDeleteScopeResponseDeserializer,
  _AgentsPagedResultMemoryItem,
  _agentsPagedResultMemoryItemDeserializer,
  DeleteMemoryResponse,
  deleteMemoryResponseDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
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
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteMemorySend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  memoryId: string,
  options: BetaMemoryStoresDeleteMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items/{memory_id}{?api%2Dversion}",
    {
      name: name,
      memory_id: memoryId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return deleteMemoryResponseDeserializer(result.body);
}

/** Deletes the specified memory item from the memory store. */
export async function deleteMemory(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  memoryId: string,
  options: BetaMemoryStoresDeleteMemoryOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryResponse> {
  const result = await _deleteMemorySend(context, foundryFeatures, name, memoryId, options);
  return _deleteMemoryDeserialize(result);
}

export function _listMemoriesSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresListMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items:list{?kind,limit,order,after,before,api%2Dversion}",
    {
      name: name,
      kind: options?.kind,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return _agentsPagedResultMemoryItemDeserializer(result.body);
}

/** Returns memory items from the specified memory store. */
export function listMemories(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresListMemoriesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listMemoriesSend(context, foundryFeatures, name, scope, options),
    _listMemoriesDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getMemorySend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  memoryId: string,
  options: BetaMemoryStoresGetMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items/{memory_id}{?api%2Dversion}",
    {
      name: name,
      memory_id: memoryId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryItemUnionDeserializer(result.body);
}

/** Retrieves the specified memory item from the memory store. */
export async function getMemory(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  memoryId: string,
  options: BetaMemoryStoresGetMemoryOptionalParams = { requestOptions: {} },
): Promise<MemoryItemUnion> {
  const result = await _getMemorySend(context, foundryFeatures, name, memoryId, options);
  return _getMemoryDeserialize(result);
}

export function _updateMemorySend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  memoryId: string,
  content: string,
  options: BetaMemoryStoresUpdateMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items/{memory_id}{?api%2Dversion}",
    {
      name: name,
      memory_id: memoryId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryItemUnionDeserializer(result.body);
}

/** Updates the specified memory item in the memory store. */
export async function updateMemory(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  memoryId: string,
  content: string,
  options: BetaMemoryStoresUpdateMemoryOptionalParams = { requestOptions: {} },
): Promise<MemoryItemUnion> {
  const result = await _updateMemorySend(
    context,
    foundryFeatures,
    name,
    memoryId,
    content,
    options,
  );
  return _updateMemoryDeserialize(result);
}

export function _createMemorySend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  content: string,
  kind: MemoryItemKind,
  options: BetaMemoryStoresCreateMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/items{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryItemUnionDeserializer(result.body);
}

/** Creates a memory item in the specified memory store. */
export async function createMemory(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  content: string,
  kind: MemoryItemKind,
  options: BetaMemoryStoresCreateMemoryOptionalParams = { requestOptions: {} },
): Promise<MemoryItemUnion> {
  const result = await _createMemorySend(
    context,
    foundryFeatures,
    name,
    scope,
    content,
    kind,
    options,
  );
  return _createMemoryDeserialize(result);
}

export function _deleteScopeSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}:delete_scope{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryStoreDeleteScopeResponseDeserializer(result.body);
}

/** Deletes all memories in the specified memory store that are associated with the provided scope. */
export async function deleteScope(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreDeleteScopeResponse> {
  const result = await _deleteScopeSend(context, foundryFeatures, name, scope, options);
  return _deleteScopeDeserialize(result);
}

export function _getUpdateResultSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  updateId: string,
  options: BetaMemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}/updates/{update_id}{?api%2Dversion}",
    {
      name: name,
      update_id: updateId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryStoreUpdateResponseDeserializer(result.body);
}

/** Retrieves the status and result of a memory store update operation. */
export async function getUpdateResult(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  updateId: string,
  options: BetaMemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreUpdateResponse> {
  const result = await _getUpdateResultSend(context, foundryFeatures, name, updateId, options);
  return _getUpdateResultDeserialize(result);
}

export function _updateMemoriesSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}:update_memories{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
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
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MemoryStoreUpdateCompletedResult>, MemoryStoreUpdateCompletedResult> {
  return getLongRunningPoller(context, _updateMemoriesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateMemoriesSend(context, foundryFeatures, name, scope, options),

    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
}

export function _searchMemoriesSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}:search_memories{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryStoreSearchResponseDeserializer(result.body);
}

/** Searches the specified memory store for memories relevant to the provided conversation context. */
export async function searchMemories(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  scope: string,
  options: BetaMemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreSearchResponse> {
  const result = await _searchMemoriesSend(context, foundryFeatures, name, scope, options);
  return _searchMemoriesDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  options: BetaMemoryStoresDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteMemoryStoreResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return deleteMemoryStoreResponseDeserializer(result.body);
}

/** Deletes the specified memory store. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  options: BetaMemoryStoresDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryStoreResponse> {
  const result = await _$deleteSend(context, foundryFeatures, name, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  options: BetaMemoryStoresListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores{?limit,order,after,before,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return _agentsPagedResultMemoryStoreObjectDeserializer(result.body);
}

/** Returns the memory stores available to the caller. */
export function list(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  options: BetaMemoryStoresListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  options: BetaMemoryStoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Retrieves the specified memory store and its current configuration. */
export async function get(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  options: BetaMemoryStoresGetOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _getSend(context, foundryFeatures, name, options);
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  options: BetaMemoryStoresUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Updates the specified memory store with the supplied configuration changes. */
export async function update(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  options: BetaMemoryStoresUpdateOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _updateSend(context, foundryFeatures, name, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  definition: MemoryStoreDefinitionUnion,
  options: BetaMemoryStoresCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/memory_stores{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Creates a memory store resource with the provided configuration. */
export async function create(
  context: Client,
  foundryFeatures: "MemoryStores=V1Preview",
  name: string,
  definition: MemoryStoreDefinitionUnion,
  options: BetaMemoryStoresCreateOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _createSend(context, foundryFeatures, name, definition, options);
  return _createDeserialize(result);
}
