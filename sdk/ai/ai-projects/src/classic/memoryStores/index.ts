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
  MemoryStoreUpdateCompletedResult,
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
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Get memory store update result. */
  getUpdateResult: (
    name: string,
    updateId: string,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /** Update memory store with conversation memories. */
  updateMemories: (
    name: string,
    scope: string,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresUpdateMemoriesOptionalParams,
  ) => PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
  /** Search for relevant memories from a memory store based on conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Delete a memory store. */
  delete: (
    name: string,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresDeleteMemoryStoreOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  list: (
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresListMemoryStoresOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  get: (
    name: string,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresGetMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Update a memory store. */
  update: (
    name: string,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresUpdateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Create a memory store. */
  create: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    foundryBeta: "MemoryStores=v1",
    options?: MemoryStoresCreateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getMemoryStores(context: AIProjectContext) {
  return {
    deleteScope: (
      name: string,
      scope: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresDeleteScopeOptionalParams,
    ) => deleteScope(context, name, scope, foundryBeta, options),
    getUpdateResult: (
      name: string,
      updateId: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresGetUpdateResultOptionalParams,
    ) => getUpdateResult(context, name, updateId, foundryBeta, options),
    updateMemories: (
      name: string,
      scope: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresUpdateMemoriesOptionalParams,
    ) => updateMemories(context, name, scope, foundryBeta, options),
    searchMemories: (
      name: string,
      scope: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresSearchMemoriesOptionalParams,
    ) => searchMemories(context, name, scope, foundryBeta, options),
    delete: (
      name: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresDeleteMemoryStoreOptionalParams,
    ) => deleteMemoryStore(context, name, foundryBeta, options),
    list: (foundryBeta: "MemoryStores=v1", options?: MemoryStoresListMemoryStoresOptionalParams) =>
      listMemoryStores(context, foundryBeta, options),
    get: (
      name: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresGetMemoryStoreOptionalParams,
    ) => getMemoryStore(context, name, foundryBeta, options),
    update: (
      name: string,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresUpdateMemoryStoreOptionalParams,
    ) => updateMemoryStore(context, name, foundryBeta, options),
    create: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      foundryBeta: "MemoryStores=v1",
      options?: MemoryStoresCreateMemoryStoreOptionalParams,
    ) => createMemoryStore(context, name, definition, foundryBeta, options),
  };
}

export function _getMemoryStoresOperations(context: AIProjectContext): MemoryStoresOperations {
  return {
    ..._getMemoryStores(context),
  };
}
