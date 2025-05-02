// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  OpenAIPageableListOfVectorStore,
  VectorStore,
  VectorStoreDeletionStatus,
} from "../../models/models.js";
import {
  VectorStoresDeleteVectorStoreOptionalParams,
  VectorStoresModifyVectorStoreOptionalParams,
  VectorStoresGetVectorStoreOptionalParams,
  VectorStoresCreateVectorStoreOptionalParams,
  VectorStoresListVectorStoresOptionalParams,
} from "../../api/vectorStores/options.js";
import {
  deleteVectorStore,
  modifyVectorStore,
  getVectorStore,
  createVectorStore,
  listVectorStores,
  createVectorStoreAndPoll,
} from "../../api/vectorStores/operations.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VectorStores operations. */
export interface VectorStoresOperations {
  /** Deletes the vector store object matching the specified ID. */
  delete: (
    vectorStoreId: string,
    options?: VectorStoresDeleteVectorStoreOptionalParams,
  ) => Promise<VectorStoreDeletionStatus>;
  /** Modifies an existing vector store. */
  update: (
    vectorStoreId: string,
    options?: VectorStoresModifyVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Returns the vector store object matching the specified ID. */
  get: (
    vectorStoreId: string,
    options?: VectorStoresGetVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Creates a vector store. */
  create: (options?: VectorStoresCreateVectorStoreOptionalParams) => Promise<VectorStore>;
  /** Creates a vector store and poll. */
  createAndPoll(
    options?: VectorStoresCreateVectorStoreOptionalParams,
  ): PollerLike<OperationState<VectorStore>, VectorStore>;
  /** Returns a list of vector stores. */
  list: (
    options?: VectorStoresListVectorStoresOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStore>;
}

function _getVectorStores(context: AgentsContext) {
  return {
    delete: (vectorStoreId: string, options?: VectorStoresDeleteVectorStoreOptionalParams) =>
      deleteVectorStore(context, vectorStoreId, options),
    update: (vectorStoreId: string, options?: VectorStoresModifyVectorStoreOptionalParams) =>
      modifyVectorStore(context, vectorStoreId, options),
    get: (vectorStoreId: string, options?: VectorStoresGetVectorStoreOptionalParams) =>
      getVectorStore(context, vectorStoreId, options),
    create: (options?: VectorStoresCreateVectorStoreOptionalParams) =>
      createVectorStore(context, options),
    createAndPoll: (options?: VectorStoresCreateVectorStoreOptionalParams) =>
      createVectorStoreAndPoll(context, options),
    list: (options?: VectorStoresListVectorStoresOptionalParams) =>
      listVectorStores(context, options),
  };
}

export function _getVectorStoresOperations(context: AgentsContext): VectorStoresOperations {
  return {
    ..._getVectorStores(context),
  };
}
