// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  FileListResponse,
  FileInfo,
  FilePurpose,
  FileDeletionStatus,
} from "../../models/models.js";
import {
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
} from "../../api/files/operations.js";

/** Interface representing a Files operations. */
export interface FilesOperations {
  /** Retrieves the raw content of a specific file. */
  getFileContent: (
    fileId: string,
    options?: FilesGetFileContentOptionalParams,
  ) => Promise<Uint8Array>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFile: (
    fileId: string,
    options?: FilesGetFileOptionalParams,
  ) => Promise<FileInfo>;
  /** Delete a previously uploaded file. */
  deleteFile: (
    fileId: string,
    options?: FilesDeleteFileOptionalParams,
  ) => Promise<FileDeletionStatus>;
  /** Uploads a file for use by other operations. */
  uploadFile: (
    file: ReadableStream | NodeJS.ReadableStream,
    purpose: FilePurpose,
    options: FilesUploadFileOptionalParams,
  ) => Promise<FileInfo>;
  /** Gets a list of previously uploaded files. */
  listFiles: (
    options?: FilesListFilesOptionalParams,
  ) => Promise<FileListResponse>;
}

function _getFiles(context: AgentsContext) {
  return {
    getFileContent: (
      fileId: string,
      options?: FilesGetFileContentOptionalParams,
    ) => getFileContent(context, fileId, options),
    getFile: (fileId: string, options?: FilesGetFileOptionalParams) =>
      getFile(context, fileId, options),
    deleteFile: (fileId: string, options?: FilesDeleteFileOptionalParams) =>
      deleteFile(context, fileId, options),
    uploadFile: (
     file: ReadableStream | NodeJS.ReadableStream,
    purpose: FilePurpose,
    options: FilesUploadFileOptionalParams,
    ) => uploadFile(context, { file: file, purpose: purpose, filename: options.fileName }, options),
    listFiles: (options?: FilesListFilesOptionalParams) =>
      listFiles(context, options),
  };
}

export function _getFilesOperations(context: AgentsContext): FilesOperations {
  return {
    ..._getFiles(context),
  };
}
