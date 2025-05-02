// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  OpenAIPageableListOfVectorStoreFile,
  VectorStoreFileBatch,
} from "../../models/models.js";
import {
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

/** Interface representing a VectorStoreFileBatches operations. */
export interface VectorStoreFileBatchesOperations {
  /** Returns a list of vector store files in a batch. */
  listVectorStoreFileBatchFiles: (
    vectorStoreId: string,
    batchId: string,
    options?: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStoreFile>;
  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  cancelVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    options?: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Retrieve a vector store file batch. */
  getVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    options?: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Create a vector store file batch. */
  createVectorStoreFileBatch: (
    vectorStoreId: string,
    options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Create a vector store file batch and poll. */
  createVectorStoreFileBatchAndPoll: (
    vectorStoreId: string,
    options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
}

function _getVectorStoreFileBatches(context: AgentsContext) {
  return {
    listVectorStoreFileBatchFiles: (
      vectorStoreId: string,
      batchId: string,
      options?: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
    ) =>
      listVectorStoreFileBatchFiles(context, vectorStoreId, batchId, options),
    cancelVectorStoreFileBatch: (
      vectorStoreId: string,
      batchId: string,
      options?: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
    ) => cancelVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    getVectorStoreFileBatch: (
      vectorStoreId: string,
      batchId: string,
      options?: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
    ) => getVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    createVectorStoreFileBatch: (
      vectorStoreId: string,
      options?: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
    ) => createVectorStoreFileBatch(context, vectorStoreId, options),
    createVectorStoreFileBatchAndPoll: (
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
