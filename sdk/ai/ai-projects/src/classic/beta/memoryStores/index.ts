// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteScope,
  getUpdateResult,
  updateMemories,
  searchMemories,
  deleteMemoryStore,
  listMemoryStores,
  getMemoryStore,
  updateMemoryStore,
  createMemoryStore,
} from "../../../api/beta/memoryStores/operations.js";
import {
  BetaMemoryStoresDeleteScopeOptionalParams,
  BetaMemoryStoresGetUpdateResultOptionalParams,
  BetaMemoryStoresUpdateMemoriesOptionalParams,
  BetaMemoryStoresSearchMemoriesOptionalParams,
  BetaMemoryStoresDeleteMemoryStoreOptionalParams,
  BetaMemoryStoresListMemoryStoresOptionalParams,
  BetaMemoryStoresGetMemoryStoreOptionalParams,
  BetaMemoryStoresUpdateMemoryStoreOptionalParams,
  BetaMemoryStoresCreateMemoryStoreOptionalParams,
} from "../../../api/beta/memoryStores/options.js";
import {
  MemoryStoreDefinitionUnion,
  MemoryStore,
  DeleteMemoryStoreResponse,
  MemoryStoreSearchResponse,
  MemoryStoreUpdateResponse,
  MemoryStoreUpdateCompletedResult,
  MemoryStoreDeleteScopeResponse,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaMemoryStores operations. */
export interface BetaMemoryStoresOperations {
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
    options?: BetaMemoryStoresDeleteMemoryStoreOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  list: (
    options?: BetaMemoryStoresListMemoryStoresOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  get: (
    name: string,
    options?: BetaMemoryStoresGetMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Update a memory store. */
  update: (
    name: string,
    options?: BetaMemoryStoresUpdateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Create a memory store. */
  create: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    options?: BetaMemoryStoresCreateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getBetaMemoryStores(context: AIProjectContext) {
  return {
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
    delete: (name: string, options?: BetaMemoryStoresDeleteMemoryStoreOptionalParams) =>
      deleteMemoryStore(context, name, options),
    list: (options?: BetaMemoryStoresListMemoryStoresOptionalParams) =>
      listMemoryStores(context, options),
    get: (name: string, options?: BetaMemoryStoresGetMemoryStoreOptionalParams) =>
      getMemoryStore(context, name, options),
    update: (name: string, options?: BetaMemoryStoresUpdateMemoryStoreOptionalParams) =>
      updateMemoryStore(context, name, options),
    create: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      options?: BetaMemoryStoresCreateMemoryStoreOptionalParams,
    ) => createMemoryStore(context, name, definition, options),
  };
}

export function _getBetaMemoryStoresOperations(
  context: AIProjectContext,
): BetaMemoryStoresOperations {
  return {
    ..._getBetaMemoryStores(context),
  };
}
