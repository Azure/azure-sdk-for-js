// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import type { VectorStoreFile, VectorStoreFileBatch } from "../../models/models.js";
import type {
  VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
  VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
} from "../../api/vectorStoreFileBatches/options.js";
import {
  listVectorStoreFileBatchFiles,
  cancelVectorStoreFileBatch,
  getVectorStoreFileBatch,
  createVectorStoreFileBatch,
  createVectorStoreFileBatchAndPoll,
} from "../../api/vectorStoreFileBatches/operations.js";
import type { OperationState, PollerLike } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VectorStoreFileBatches operations. */
export interface VectorStoreFileBatchesOperations {
  /** Returns a list of vector store files in a batch. */
  list: (
    vectorStoreId: string,
    batchId: string,
    options?: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
  ) => PagedAsyncIterableIterator<VectorStoreFile>;
  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  cancel: (
    vectorStoreId: string,
    batchId: string,
    options?: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Retrieve a vector store file batch. */
  get: (
    vectorStoreId: string,
    batchId: string,
    options?: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Create a vector store file batch. */
  create: (
    vectorStoreId: string,
    options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Create a vector store file batch and poll. */
  createAndPoll: (
    vectorStoreId: string,
    options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
  ) => PollerLike<OperationState<VectorStoreFileBatch>, VectorStoreFileBatch>;
}

function _getVectorStoreFileBatches(context: AgentsContext) {
  return {
    list: (
      vectorStoreId: string,
      batchId: string,
      options?: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
    ) => listVectorStoreFileBatchFiles(context, vectorStoreId, batchId, options),
    cancel: (
      vectorStoreId: string,
      batchId: string,
      options?: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
    ) => cancelVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    get: (
      vectorStoreId: string,
      batchId: string,
      options?: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
    ) => getVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    create: (
      vectorStoreId: string,
      options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
    ) => createVectorStoreFileBatch(context, vectorStoreId, options),
    createAndPoll: (
      vectorStoreId: string,
      options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
    ) => createVectorStoreFileBatchAndPoll(context, vectorStoreId, options),
  };
}

export function _getVectorStoreFileBatchesOperations(
  context: AgentsContext,
): VectorStoreFileBatchesOperations {
  return {
    ..._getVectorStoreFileBatches(context),
  };
}
