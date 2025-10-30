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
  MemoryStoreObject,
  DeleteMemoryStoreResponse,
  MemoryStoreSearchResponse,
  MemoryStoreUpdateResponse,
  MemoryStoreUpdateResult,
  MemoryStoreDeleteScopeResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  ) => PollerLike<OperationState<MemoryStoreUpdateResult>, MemoryStoreUpdateResult>;
  /** Search for relevant memories from a memory store based on conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    options?: MemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Delete a memory store. */
  deleteMemoryStore: (
    name: string,
    options?: MemoryStoresDeleteMemoryStoreOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  listMemoryStores: (
    options?: MemoryStoresListMemoryStoresOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStoreObject>;
  /** Retrieve a memory store. */
  getMemoryStore: (
    name: string,
    options?: MemoryStoresGetMemoryStoreOptionalParams,
  ) => Promise<MemoryStoreObject>;
  /** Update a memory store. */
  updateMemoryStore: (
    name: string,
    options?: MemoryStoresUpdateMemoryStoreOptionalParams,
  ) => Promise<MemoryStoreObject>;
  /** Create a memory store. */
  createMemoryStore: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    options?: MemoryStoresCreateMemoryStoreOptionalParams,
  ) => Promise<MemoryStoreObject>;
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
    deleteMemoryStore: (name: string, options?: MemoryStoresDeleteMemoryStoreOptionalParams) =>
      deleteMemoryStore(context, name, options),
    listMemoryStores: (options?: MemoryStoresListMemoryStoresOptionalParams) =>
      listMemoryStores(context, options),
    getMemoryStore: (name: string, options?: MemoryStoresGetMemoryStoreOptionalParams) =>
      getMemoryStore(context, name, options),
    updateMemoryStore: (name: string, options?: MemoryStoresUpdateMemoryStoreOptionalParams) =>
      updateMemoryStore(context, name, options),
    createMemoryStore: (
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
