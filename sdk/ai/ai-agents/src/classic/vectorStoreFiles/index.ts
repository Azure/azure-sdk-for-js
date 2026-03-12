// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import type { VectorStoreFile, VectorStoreFileDeletionStatus } from "../../models/models.js";
import type {
  VectorStoreFilesDeleteVectorStoreFileOptionalParams,
  VectorStoreFilesGetVectorStoreFileOptionalParams,
  VectorStoreFilesCreateVectorStoreFileOptionalParams,
  VectorStoreFilesListVectorStoreFilesOptionalParams,
} from "../../api/vectorStoreFiles/options.js";
import {
  deleteVectorStoreFile,
  getVectorStoreFile,
  createVectorStoreFile,
  listVectorStoreFiles,
  createVectorStoreFileAndPoll,
} from "../../api/vectorStoreFiles/operations.js";
import type { OperationState, PollerLike } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VectorStoreFiles operations. */
export interface VectorStoreFilesOperations {
  /** Deletes a vector store file. This removes the file‐to‐store link (does not delete the file itself). */
  delete: (
    vectorStoreId: string,
    fileId: string,
    options?: VectorStoreFilesDeleteVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFileDeletionStatus>;
  /** Retrieves a vector store file. */
  get: (
    vectorStoreId: string,
    fileId: string,
    options?: VectorStoreFilesGetVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Create a vector store file by attaching a file to a vector store. */
  create: (
    vectorStoreId: string,
    options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Create a vector store file by attaching a file to a vector store and poll. */
  createAndPoll: (
    vectorStoreId: string,
    options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
  ) => PollerLike<OperationState<VectorStoreFile>, VectorStoreFile>;
  /** Returns a list of vector store files. */
  list: (
    vectorStoreId: string,
    options?: VectorStoreFilesListVectorStoreFilesOptionalParams,
  ) => PagedAsyncIterableIterator<VectorStoreFile>;
}

function _getVectorStoreFiles(context: AgentsContext) {
  return {
    delete: (
      vectorStoreId: string,
      fileId: string,
      options?: VectorStoreFilesDeleteVectorStoreFileOptionalParams,
    ) => deleteVectorStoreFile(context, vectorStoreId, fileId, options),
    get: (
      vectorStoreId: string,
      fileId: string,
      options?: VectorStoreFilesGetVectorStoreFileOptionalParams,
    ) => getVectorStoreFile(context, vectorStoreId, fileId, options),
    create: (
      vectorStoreId: string,
      options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
    ) => createVectorStoreFile(context, vectorStoreId, options),
    createAndPoll: (
      vectorStoreId: string,
      options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
    ) => createVectorStoreFileAndPoll(context, vectorStoreId, options),
    list: (vectorStoreId: string, options?: VectorStoreFilesListVectorStoreFilesOptionalParams) =>
      listVectorStoreFiles(context, vectorStoreId, options),
  };
}

export function _getVectorStoreFilesOperations(context: AgentsContext): VectorStoreFilesOperations {
  return {
    ..._getVectorStoreFiles(context),
  };
}
