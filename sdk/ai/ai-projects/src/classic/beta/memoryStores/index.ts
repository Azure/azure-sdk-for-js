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
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Get memory store update result. */
  getUpdateResult: (
    name: string,
    updateId: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /** Update memory store with conversation memories. */
  updateMemories: (
    name: string,
    scope: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
  ) => PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
  /** Search for relevant memories from a memory store based on conversation context. */
  searchMemories: (
    name: string,
    scope: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Delete a memory store. */
  deleteMemoryStore: (
    name: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresDeleteMemoryStoreOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  listMemoryStores: (
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresListMemoryStoresOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  getMemoryStore: (
    name: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresGetMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Update a memory store. */
  updateMemoryStore: (
    name: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresUpdateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
  /** Create a memory store. */
  createMemoryStore: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresCreateMemoryStoreOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getBetaMemoryStores(context: AIProjectContext) {
  return {
    deleteScope: (
      name: string,
      scope: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresDeleteScopeOptionalParams,
    ) => deleteScope(context, name, scope, foundryFeatures, options),
    getUpdateResult: (
      name: string,
      updateId: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresGetUpdateResultOptionalParams,
    ) => getUpdateResult(context, name, updateId, foundryFeatures, options),
    updateMemories: (
      name: string,
      scope: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
    ) => updateMemories(context, name, scope, foundryFeatures, options),
    searchMemories: (
      name: string,
      scope: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresSearchMemoriesOptionalParams,
    ) => searchMemories(context, name, scope, foundryFeatures, options),
    deleteMemoryStore: (
      name: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresDeleteMemoryStoreOptionalParams,
    ) => deleteMemoryStore(context, name, foundryFeatures, options),
    listMemoryStores: (
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresListMemoryStoresOptionalParams,
    ) => listMemoryStores(context, foundryFeatures, options),
    getMemoryStore: (
      name: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresGetMemoryStoreOptionalParams,
    ) => getMemoryStore(context, name, foundryFeatures, options),
    updateMemoryStore: (
      name: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresUpdateMemoryStoreOptionalParams,
    ) => updateMemoryStore(context, name, foundryFeatures, options),
    createMemoryStore: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresCreateMemoryStoreOptionalParams,
    ) => createMemoryStore(context, name, definition, foundryFeatures, options),
  };
}

export function _getBetaMemoryStoresOperations(
  context: AIProjectContext,
): BetaMemoryStoresOperations {
  return {
    ..._getBetaMemoryStores(context),
  };
}
