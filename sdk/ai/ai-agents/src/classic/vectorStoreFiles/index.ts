// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  OpenAIPageableListOfVectorStoreFile,
  VectorStoreFile,
  VectorStoreFileDeletionStatus,
} from "../../models/models.js";
import {
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

/** Interface representing a VectorStoreFiles operations. */
export interface VectorStoreFilesOperations {
  /** Deletes a vector store file. This removes the file‐to‐store link (does not delete the file itself). */
  deleteVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: VectorStoreFilesDeleteVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFileDeletionStatus>;
  /** Retrieves a vector store file. */
  getVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: VectorStoreFilesGetVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Create a vector store file by attaching a file to a vector store. */
  createVectorStoreFile: (
    vectorStoreId: string,
    options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Create a vector store file by attaching a file to a vector store and poll. */
  createVectorStoreFileAndPoll: (
    vectorStoreId: string,
    options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Returns a list of vector store files. */
  listVectorStoreFiles: (
    vectorStoreId: string,
    options?: VectorStoreFilesListVectorStoreFilesOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStoreFile>;
}

function _getVectorStoreFiles(context: AgentsContext) {
  return {
    deleteVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: VectorStoreFilesDeleteVectorStoreFileOptionalParams,
    ) => deleteVectorStoreFile(context, vectorStoreId, fileId, options),
    getVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: VectorStoreFilesGetVectorStoreFileOptionalParams,
    ) => getVectorStoreFile(context, vectorStoreId, fileId, options),
    createVectorStoreFile: (
      vectorStoreId: string,
      options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
    ) => createVectorStoreFile(context, vectorStoreId, options),
    createVectorStoreFileAndPoll: (
      vectorStoreId: string,
      options?: VectorStoreFilesCreateVectorStoreFileOptionalParams,
    ) => createVectorStoreFileAndPoll(context, vectorStoreId, options),
    listVectorStoreFiles: (
      vectorStoreId: string,
      options?: VectorStoreFilesListVectorStoreFilesOptionalParams,
    ) => listVectorStoreFiles(context, vectorStoreId, options),
  };
}

export function _getVectorStoreFilesOperations(
  context: AgentsContext,
): VectorStoreFilesOperations {
  return {
    ..._getVectorStoreFiles(context),
  };
}
