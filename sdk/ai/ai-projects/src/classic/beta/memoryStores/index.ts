// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteMemory,
  listMemories,
  getMemory,
  updateMemory,
  createMemory,
  deleteScope,
  getUpdateResult,
  updateMemories,
  searchMemories,
  $delete,
  list,
  get,
  update,
  create,
} from "../../../api/beta/memoryStores/operations.js";
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
} from "../../../api/beta/memoryStores/options.js";
import type {
  MemoryStoreDefinitionUnion,
  MemoryStore,
  DeleteMemoryStoreResponse,
  MemoryStoreSearchResponse,
  MemoryItemUnion,
  MemoryItemKind,
  MemoryStoreUpdateResponse,
  MemoryStoreUpdateCompletedResult,
  MemoryStoreDeleteScopeResponse,
  DeleteMemoryResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaMemoryStores operations. */
export interface BetaMemoryStoresOperations {
  /** Delete a memory item from a memory store. */
  deleteMemory: (
    name: string,
    memoryId: string,
    options?: BetaMemoryStoresDeleteMemoryOptionalParams,
  ) => Promise<DeleteMemoryResponse>;
  /** List all memory items in a memory store. */
  listMemories: (
    name: string,
    options?: BetaMemoryStoresListMemoriesOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryItemUnion>;
  /** Retrieve a memory item from a memory store. */
  getMemory: (
    name: string,
    memoryId: string,
    options?: BetaMemoryStoresGetMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Update a memory item in a memory store. */
  updateMemory: (
    name: string,
    memoryId: string,
    content: string,
    options?: BetaMemoryStoresUpdateMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Create a memory item in a memory store. */
  createMemory: (
    name: string,
    scope: string,
    content: string,
    kind: MemoryItemKind,
    options?: BetaMemoryStoresCreateMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Delete all memories associated with a specific scope from a memory store. */
  deleteScope: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Get memory store update result. */
  getUpdateResult: (
    name: string,
    updateId: string,
    options?: BetaMemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /** Update memory store with conversation memories. */
  updateMemories: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
  ) => PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
  /** Search for relevant memories from a memory store based on conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Delete a memory store. */
  delete: (
    name: string,
    options?: BetaMemoryStoresDeleteOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  list: (options?: BetaMemoryStoresListOptionalParams) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  get: (name: string, options?: BetaMemoryStoresGetOptionalParams) => Promise<MemoryStore>;
  /** Update a memory store. */
  update: (name: string, options?: BetaMemoryStoresUpdateOptionalParams) => Promise<MemoryStore>;
  /** Create a memory store. */
  create: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    options?: BetaMemoryStoresCreateOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getBetaMemoryStores(context: AIProjectContext) {
  return {
    deleteMemory: (
      name: string,
      memoryId: string,
      options?: BetaMemoryStoresDeleteMemoryOptionalParams,
    ) => deleteMemory(context, name, memoryId, options),
    listMemories: (name: string, options?: BetaMemoryStoresListMemoriesOptionalParams) =>
      listMemories(context, name, options),
    getMemory: (
      name: string,
      memoryId: string,
      options?: BetaMemoryStoresGetMemoryOptionalParams,
    ) => getMemory(context, name, memoryId, options),
    updateMemory: (
      name: string,
      memoryId: string,
      content: string,
      options?: BetaMemoryStoresUpdateMemoryOptionalParams,
    ) => updateMemory(context, name, memoryId, content, options),
    createMemory: (
      name: string,
      scope: string,
      content: string,
      kind: MemoryItemKind,
      options?: BetaMemoryStoresCreateMemoryOptionalParams,
    ) => createMemory(context, name, scope, content, kind, options),
    deleteScope: (
      name: string,
      scope: string,
      options?: BetaMemoryStoresDeleteScopeOptionalParams,
    ) => deleteScope(context, name, scope, options),
    getUpdateResult: (
      name: string,
      updateId: string,
      options?: BetaMemoryStoresGetUpdateResultOptionalParams,
    ) => getUpdateResult(context, name, updateId, options),
    updateMemories: (
      name: string,
      scope: string,
      options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
    ) => updateMemories(context, name, scope, options),
    searchMemories: (
      name: string,
      scope: string,
      options?: BetaMemoryStoresSearchMemoriesOptionalParams,
    ) => searchMemories(context, name, scope, options),
    delete: (name: string, options?: BetaMemoryStoresDeleteOptionalParams) =>
      $delete(context, name, options),
    list: (options?: BetaMemoryStoresListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaMemoryStoresGetOptionalParams) => get(context, name, options),
    update: (name: string, options?: BetaMemoryStoresUpdateOptionalParams) =>
      update(context, name, options),
    create: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      options?: BetaMemoryStoresCreateOptionalParams,
    ) => create(context, name, definition, options),
  };
}

export function _getBetaMemoryStoresOperations(
  context: AIProjectContext,
): BetaMemoryStoresOperations {
  return {
    ..._getBetaMemoryStores(context),
  };
}
