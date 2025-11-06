// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import {
  deleteVectorStore,
  modifyVectorStore,
  getVectorStore,
  createVectorStore,
  listVectorStores,
} from "../../api/vectorStores/operations.js";
import type {
  VectorStoresDeleteVectorStoreOptionalParams,
  VectorStoresModifyVectorStoreOptionalParams,
  VectorStoresGetVectorStoreOptionalParams,
  VectorStoresCreateVectorStoreOptionalParams,
  VectorStoresListVectorStoresOptionalParams,
} from "../../api/vectorStores/options.js";
import type { VectorStore, VectorStoreDeletionStatus } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VectorStores operations. */
export interface VectorStoresOperations {
  /** Deletes the vector store object matching the specified ID. */
  deleteVectorStore: (
    vectorStoreId: string,
    options?: VectorStoresDeleteVectorStoreOptionalParams,
  ) => Promise<VectorStoreDeletionStatus>;
  /** Modifies an existing vector store. */
  modifyVectorStore: (
    vectorStoreId: string,
    options?: VectorStoresModifyVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Returns the vector store object matching the specified ID. */
  getVectorStore: (
    vectorStoreId: string,
    options?: VectorStoresGetVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Creates a vector store. */
  createVectorStore: (
    options?: VectorStoresCreateVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Returns a list of vector stores. */
  listVectorStores: (
    options?: VectorStoresListVectorStoresOptionalParams,
  ) => PagedAsyncIterableIterator<VectorStore>;
}

function _getVectorStores(context: AgentsContext) {
  return {
    deleteVectorStore: (
      vectorStoreId: string,
      options?: VectorStoresDeleteVectorStoreOptionalParams,
    ) => deleteVectorStore(context, vectorStoreId, options),
    modifyVectorStore: (
      vectorStoreId: string,
      options?: VectorStoresModifyVectorStoreOptionalParams,
    ) => modifyVectorStore(context, vectorStoreId, options),
    getVectorStore: (vectorStoreId: string, options?: VectorStoresGetVectorStoreOptionalParams) =>
      getVectorStore(context, vectorStoreId, options),
    createVectorStore: (options?: VectorStoresCreateVectorStoreOptionalParams) =>
      createVectorStore(context, options),
    listVectorStores: (options?: VectorStoresListVectorStoresOptionalParams) =>
      listVectorStores(context, options),
  };
}

export function _getVectorStoresOperations(context: AgentsContext): VectorStoresOperations {
  return {
    ..._getVectorStores(context),
  };
}
