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
  /** Deletes the specified memory item from the memory store. */
  deleteMemory: (
    name: string,
    memoryId: string,
    options?: BetaMemoryStoresDeleteMemoryOptionalParams,
  ) => Promise<DeleteMemoryResponse>;
  /** Returns memory items from the specified memory store. */
  listMemories: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresListMemoriesOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryItemUnion>;
  /** Retrieves the specified memory item from the memory store. */
  getMemory: (
    name: string,
    memoryId: string,
    options?: BetaMemoryStoresGetMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Updates the specified memory item in the memory store. */
  updateMemory: (
    name: string,
    memoryId: string,
    content: string,
    options?: BetaMemoryStoresUpdateMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Creates a memory item in the specified memory store. */
  createMemory: (
    name: string,
    scope: string,
    content: string,
    kind: MemoryItemKind,
    options?: BetaMemoryStoresCreateMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Deletes all memories in the specified memory store that are associated with the provided scope. */
  deleteScope: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Retrieves the status and result of a memory store update operation. */
  getUpdateResult: (
    name: string,
    updateId: string,
    options?: BetaMemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /**
   * Starts an update that writes conversation memories into the specified memory store.
   * The operation returns a long-running status location for polling the update result.
   */
  updateMemories: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
  ) => PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
  /** Searches the specified memory store for memories relevant to the provided conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    options?: BetaMemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Deletes the specified memory store. */
  delete: (
    name: string,
    options?: BetaMemoryStoresDeleteOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** Returns the memory stores available to the caller. */
  list: (options?: BetaMemoryStoresListOptionalParams) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieves the specified memory store and its current configuration. */
  get: (name: string, options?: BetaMemoryStoresGetOptionalParams) => Promise<MemoryStore>;
  /** Updates the specified memory store with the supplied configuration changes. */
  update: (name: string, options?: BetaMemoryStoresUpdateOptionalParams) => Promise<MemoryStore>;
  /** Creates a memory store resource with the provided configuration. */
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
    listMemories: (
      name: string,
      scope: string,
      options?: BetaMemoryStoresListMemoriesOptionalParams,
    ) => listMemories(context, name, scope, options),
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
