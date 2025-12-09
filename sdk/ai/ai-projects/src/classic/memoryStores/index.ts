// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
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
} from "../../api/memoryStores/operations.js";
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
} from "../../api/memoryStores/options.js";
import {
  MemoryStoreDefinitionUnion,
  MemoryStore,
  DeleteMemoryStoreResponse,
  MemoryStoreSearchResponse,
  MemoryStoreUpdateResponse,
  MemoryStoreDeleteScopeResponse,
} from "../../models/models.js";
import { MemoryStoreUpdateMemoriesPoller } from "../../api/memoryStores/memoryStoreUpdateMemoriesPoller.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MemoryStores operations. */
export interface MemoryStoresOperations {
  /** Delete all memories associated with a specific scope from a memory store. */
  deleteScope: (
    name: string,
    scope: string,
    options?: MemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Get memory store update result. */
  getUpdateResult: (
    name: string,
    updateId: string,
    options?: MemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /** Update memory store with conversation memories. */
  updateMemories: (
    name: string,
    scope: string,
    options?: MemoryStoresUpdateMemoriesOptionalParams,
  ) => MemoryStoreUpdateMemoriesPoller;
  /** Search for relevant memories from a memory store based on conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    options?: MemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Delete a memory store. */
  delete: (
    name: string,
    options?: MemoryStoresDeleteMemoryStoreOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  list: (
    options?: MemoryStoresListMemoryStoresOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  get: (name: string, options?: MemoryStoresGetMemoryStoreOptionalParams) => Promise<MemoryStore>;
  /** Update a memory store. */
  update: (
    name: string,
    options?: MemoryStoresUpdateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Create a memory store. */
  create: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    options?: MemoryStoresCreateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getMemoryStores(context: AIProjectContext) {
  return {
    deleteScope: (name: string, scope: string, options?: MemoryStoresDeleteScopeOptionalParams) =>
      deleteScope(context, name, scope, options),
    getUpdateResult: (
      name: string,
      updateId: string,
      options?: MemoryStoresGetUpdateResultOptionalParams,
    ) => getUpdateResult(context, name, updateId, options),
    updateMemories: (
      name: string,
      scope: string,
      options?: MemoryStoresUpdateMemoriesOptionalParams,
    ) => updateMemories(context, name, scope, options),
    searchMemories: (
      name: string,
      scope: string,
      options?: MemoryStoresSearchMemoriesOptionalParams,
    ) => searchMemories(context, name, scope, options),
    delete: (name: string, options?: MemoryStoresDeleteMemoryStoreOptionalParams) =>
      deleteMemoryStore(context, name, options),
    list: (options?: MemoryStoresListMemoryStoresOptionalParams) =>
      listMemoryStores(context, options),
    get: (name: string, options?: MemoryStoresGetMemoryStoreOptionalParams) =>
      getMemoryStore(context, name, options),
    update: (name: string, options?: MemoryStoresUpdateMemoryStoreOptionalParams) =>
      updateMemoryStore(context, name, options),
    create: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      options?: MemoryStoresCreateMemoryStoreOptionalParams,
    ) => createMemoryStore(context, name, definition, options),
  };
}

export function _getMemoryStoresOperations(context: AIProjectContext): MemoryStoresOperations {
  return {
    ..._getMemoryStores(context),
  };
}
