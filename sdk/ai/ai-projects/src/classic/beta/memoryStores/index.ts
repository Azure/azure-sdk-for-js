// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
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
  MemoryStoreUpdateResponse,
  MemoryStoreUpdateCompletedResult,
  MemoryStoreDeleteScopeResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    name: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresDeleteOptionalParams,
  ) => Promise<DeleteMemoryStoreResponse>;
  /** List all memory stores. */
  list: (
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresListOptionalParams,
  ) => PagedAsyncIterableIterator<MemoryStore>;
  /** Retrieve a memory store. */
  get: (
    name: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresGetOptionalParams,
  ) => Promise<MemoryStore>;
  /** Update a memory store. */
  update: (
    name: string,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresUpdateOptionalParams,
  ) => Promise<MemoryStore>;
  /** Create a memory store. */
  create: (
    name: string,
    definition: MemoryStoreDefinitionUnion,
    foundryFeatures: "MemoryStores=V1Preview",
    options?: BetaMemoryStoresCreateOptionalParams,
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
    delete: (
      name: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresDeleteOptionalParams,
    ) => $delete(context, name, foundryFeatures, options),
    list: (
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresListOptionalParams,
    ) => list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
    update: (
      name: string,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresUpdateOptionalParams,
    ) => update(context, name, foundryFeatures, options),
    create: (
      name: string,
      definition: MemoryStoreDefinitionUnion,
      foundryFeatures: "MemoryStores=V1Preview",
      options?: BetaMemoryStoresCreateOptionalParams,
    ) => create(context, name, definition, foundryFeatures, options),
  };
}

export function _getBetaMemoryStoresOperations(
  context: AIProjectContext,
): BetaMemoryStoresOperations {
  return {
    ..._getBetaMemoryStores(context),
  };
}
