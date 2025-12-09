// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import type {
  FileListResponse,
  FileInfo,
  FilePurpose,
  FileDeletionStatus,
} from "../../models/models.js";
import type {
  FilesGetFileContentOptionalParams,
  FilesGetFileOptionalParams,
  FilesDeleteFileOptionalParams,
  FilesUploadFileOptionalParams,
  FilesListFilesOptionalParams,
} from "../../api/files/options.js";
import {
  getFileContent,
  getFile,
  deleteFile,
  uploadFile,
  listFiles,
  uploadFileAndPoll,
} from "../../api/files/operations.js";
import type { OperationState, PollerLike } from "@azure/core-lro";
import type { StreamableMethod } from "@azure-rest/core-client";

/** Interface representing a Files operations. */
export interface FilesOperations {
  /** Retrieves the raw content of a specific file. */
  getContent: (
    fileId: string,
    options?: FilesGetFileContentOptionalParams,
  ) => StreamableMethod<string | Uint8Array>;
  /** Returns information about a specific file. Does not retrieve file content. */
  get: (fileId: string, options?: FilesGetFileOptionalParams) => Promise<FileInfo>;
  /** Delete a previously uploaded file. */
  delete: (fileId: string, options?: FilesDeleteFileOptionalParams) => Promise<FileDeletionStatus>;
  /** Uploads a file for use by other operations. */
  upload: (
    file: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
    purpose: FilePurpose,
    options: FilesUploadFileOptionalParams,
  ) => Promise<FileInfo>;
  /** Uploads a file for use by other operations with polling */
  uploadAndPoll: (
    file: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
    purpose: FilePurpose,
    options: FilesUploadFileOptionalParams,
  ) => PollerLike<OperationState<FileInfo>, FileInfo>;
  /** Gets a list of previously uploaded files. */
  list: (options?: FilesListFilesOptionalParams) => Promise<FileListResponse>;
}

function _getFiles(context: AgentsContext) {
  return {
    getContent: (fileId: string, options?: FilesGetFileContentOptionalParams) =>
      getFileContent(context, fileId, options),
    get: (fileId: string, options?: FilesGetFileOptionalParams) =>
      getFile(context, fileId, options),
    delete: (fileId: string, options?: FilesDeleteFileOptionalParams) =>
      deleteFile(context, fileId, options),
    upload: (
      file: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
      purpose: FilePurpose,
      options: FilesUploadFileOptionalParams,
    ) => uploadFile(context, { file: file, purpose: purpose, filename: options.fileName }, options),
    uploadAndPoll: (
      file: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
      purpose: FilePurpose,
      options: FilesUploadFileOptionalParams,
    ) => uploadFileAndPoll(context, { file, purpose, filename: options.fileName }, options),
    list: (options?: FilesListFilesOptionalParams) => listFiles(context, options),
  };
}

export function _getFilesOperations(context: AgentsContext): FilesOperations {
  return {
    ..._getFiles(context),
  };
}
