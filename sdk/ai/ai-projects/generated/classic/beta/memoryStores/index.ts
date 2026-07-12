// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
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
} from "../../../api/beta/memoryStores/options.js";
import {
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
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaMemoryStores operations. */
export interface BetaMemoryStoresOperations {
  /** Deletes the specified memory item from the memory store. */
  deleteMemory: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    memoryId: string,
    options?: BetaMemoryStoresDeleteMemoryOptionalParams,
  ) => Promise<DeleteMemoryResponse>;
  /** Returns memory items from the specified memory store. */
  listMemories: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    scope: string,
    options?: BetaMemoryStoresListMemoriesOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryItemUnion>;
  /** Retrieves the specified memory item from the memory store. */
  getMemory: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    memoryId: string,
    options?: BetaMemoryStoresGetMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Updates the specified memory item in the memory store. */
  updateMemory: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    memoryId: string,
    content: string,
    options?: BetaMemoryStoresUpdateMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Creates a memory item in the specified memory store. */
  createMemory: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    scope: string,
    content: string,
    kind: MemoryItemKind,
    options?: BetaMemoryStoresCreateMemoryOptionalParams,
  ) => Promise<MemoryItemUnion>;
  /** Deletes all memories in the specified memory store that are associated with the provided scope. */
  deleteScope: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    scope: string,
    options?: BetaMemoryStoresDeleteScopeOptionalParams,
  ) => Promise<MemoryStoreDeleteScopeResponse>;
  /** Retrieves the status and result of a memory store update operation. */
  getUpdateResult: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    updateId: string,
    options?: BetaMemoryStoresGetUpdateResultOptionalParams,
  ) => Promise<MemoryStoreUpdateResponse>;
  /**
   * Starts an update that writes conversation memories into the specified memory store.
   * The operation returns a long-running status location for polling the update result.
   */
  updateMemories: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    scope: string,
    options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
  ) => PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
  /** Searches the specified memory store for memories relevant to the provided conversation context. */
  searchMemories: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    scope: string,
    options?: BetaMemoryStoresSearchMemoriesOptionalParams,
  ) => Promise<MemoryStoreSearchResponse>;
  /** Deletes the specified memory store. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    options?: BetaMemoryStoresDeleteOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** Returns the memory stores available to the caller. */
  list: (
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresListOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieves the specified memory store and its current configuration. */
  get: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    options?: BetaMemoryStoresGetOptionalParams,
  ) => Promise<MemoryStore>;
  /** Updates the specified memory store with the supplied configuration changes. */
  update: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    options?: BetaMemoryStoresUpdateOptionalParams,
  ) => Promise<MemoryStore>;
  /** Creates a memory store resource with the provided configuration. */
  create: (
    foundryFeatures: "MemoryStores=V1Preview",
    name: string,
    definition: MemoryStoreDefinitionUnion,
    options?: BetaMemoryStoresCreateOptionalParams,
  ) => Promise<MemoryStore>;
}

function _getBetaMemoryStores(context: AIProjectContext) {
  return {
    deleteMemory: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      memoryId: string,
      options?: BetaMemoryStoresDeleteMemoryOptionalParams,
    ) => deleteMemory(context, foundryFeatures, name, memoryId, options),
    listMemories: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      scope: string,
      options?: BetaMemoryStoresListMemoriesOptionalParams,
    ) => listMemories(context, foundryFeatures, name, scope, options),
    getMemory: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      memoryId: string,
      options?: BetaMemoryStoresGetMemoryOptionalParams,
    ) => getMemory(context, foundryFeatures, name, memoryId, options),
    updateMemory: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      memoryId: string,
      content: string,
      options?: BetaMemoryStoresUpdateMemoryOptionalParams,
    ) => updateMemory(context, foundryFeatures, name, memoryId, content, options),
    createMemory: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      scope: string,
      content: string,
      kind: MemoryItemKind,
      options?: BetaMemoryStoresCreateMemoryOptionalParams,
    ) => createMemory(context, foundryFeatures, name, scope, content, kind, options),
    deleteScope: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      scope: string,
      options?: BetaMemoryStoresDeleteScopeOptionalParams,
    ) => deleteScope(context, foundryFeatures, name, scope, options),
    getUpdateResult: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      updateId: string,
      options?: BetaMemoryStoresGetUpdateResultOptionalParams,
    ) => getUpdateResult(context, foundryFeatures, name, updateId, options),
    updateMemories: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      scope: string,
      options?: BetaMemoryStoresUpdateMemoriesOptionalParams,
    ) => updateMemories(context, foundryFeatures, name, scope, options),
    searchMemories: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      scope: string,
      options?: BetaMemoryStoresSearchMemoriesOptionalParams,
    ) => searchMemories(context, foundryFeatures, name, scope, options),
    delete: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      options?: BetaMemoryStoresDeleteOptionalParams,
    ) => $delete(context, foundryFeatures, name, options),
    list: (
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresListOptionalParams,
    ) => list(context, foundryFeatures, options),
    get: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      options?: BetaMemoryStoresGetOptionalParams,
    ) => get(context, foundryFeatures, name, options),
    update: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      options?: BetaMemoryStoresUpdateOptionalParams,
    ) => update(context, foundryFeatures, name, options),
    create: (
      foundryFeatures: "MemoryStores=V1Preview",
      name: string,
      definition: MemoryStoreDefinitionUnion,
      options?: BetaMemoryStoresCreateOptionalParams,
    ) => create(context, foundryFeatures, name, definition, options),
  };
}

export function _getBetaMemoryStoresOperations(
  context: AIProjectContext,
): BetaMemoryStoresOperations {
  return {
    ..._getBetaMemoryStores(context),
  };
}
