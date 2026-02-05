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
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Get memory store update result. */
  getUpdateResult: (
    name: string,
    updateId: string,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /** Update memory store with conversation memories. */
  updateMemories: (
    name: string,
    scope: string,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresUpdateMemoriesOptionalParams,
  ) => PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
  /** Search for relevant memories from a memory store based on conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Delete a memory store. */
  delete: (
    name: string,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresDeleteMemoryStoreOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  list: (
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresListMemoryStoresOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  get: (
    name: string,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresGetMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Update a memory store. */
  update: (
    name: string,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresUpdateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Create a memory store. */
  create: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    foundryFeatures: string | "MemoryStores=V1Preview",
    options?: MemoryStoresCreateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getMemoryStores(context: AIProjectContext) {
  return {
    deleteScope: (
      name: string,
      scope: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresDeleteScopeOptionalParams,
    ) => deleteScope(context, name, scope, foundryFeatures, options),
    getUpdateResult: (
      name: string,
      updateId: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresGetUpdateResultOptionalParams,
    ) => getUpdateResult(context, name, updateId, foundryFeatures, options),
    updateMemories: (
      name: string,
      scope: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresUpdateMemoriesOptionalParams,
    ) => updateMemories(context, name, scope, foundryFeatures, options),
    searchMemories: (
      name: string,
      scope: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresSearchMemoriesOptionalParams,
    ) => searchMemories(context, name, scope, foundryFeatures, options),
    delete: (
      name: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresDeleteMemoryStoreOptionalParams,
    ) => deleteMemoryStore(context, name, foundryFeatures, options),
    list: (
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresListMemoryStoresOptionalParams,
    ) => listMemoryStores(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresGetMemoryStoreOptionalParams,
    ) => getMemoryStore(context, name, foundryFeatures, options),
    update: (
      name: string,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresUpdateMemoryStoreOptionalParams,
    ) => updateMemoryStore(context, name, foundryFeatures, options),
    create: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      foundryFeatures: string | "MemoryStores=V1Preview",
      options?: MemoryStoresCreateMemoryStoreOptionalParams,
    ) => createMemoryStore(context, name, definition, foundryFeatures, options),
  };
}

export function _getMemoryStoresOperations(context: AIProjectContext): MemoryStoresOperations {
  return {
    ..._getMemoryStores(context),
  };
}
