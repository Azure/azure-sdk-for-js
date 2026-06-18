// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  getFileContent,
  getFile,
  deleteFile,
  uploadFile,
  listFiles,
} from "../../api/files/operations.js";
import {
  FilesGetFileContentOptionalParams,
  FilesGetFileOptionalParams,
  FilesDeleteFileOptionalParams,
  FilesUploadFileOptionalParams,
  FilesListFilesOptionalParams,
} from "../../api/files/options.js";
import {
  FileListResponse,
  FileInfo,
  FilePurpose,
  FileDeletionStatus,
  FilesGetFileContentResponse,
} from "../../models/models.js";
import { FileContents } from "../../static-helpers/multipartHelpers.js";

/** Interface representing a Files operations. */
export interface FilesOperations {
  /** Retrieves the raw content of a specific file. */
  getFileContent: (
    fileId: string,
    options?: FilesGetFileContentOptionalParams,
  ) => Promise<FilesGetFileContentResponse>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFile: (fileId: string, options?: FilesGetFileOptionalParams) => Promise<FileInfo>;
  /** Delete a previously uploaded file. */
  deleteFile: (
    fileId: string,
    options?: FilesDeleteFileOptionalParams,
  ) => Promise<FileDeletionStatus>;
  /** Uploads a file for use by other operations. */
  uploadFile: (
    body: {
      file: FileContents | { contents: FileContents; contentType?: string; filename?: string };
      purpose: FilePurpose;
      filename?: string;
    },
    options?: FilesUploadFileOptionalParams,
  ) => Promise<FileInfo>;
  /** Gets a list of previously uploaded files. */
  listFiles: (options?: FilesListFilesOptionalParams) => Promise<FileListResponse>;
}

function _getFiles(context: AgentsContext) {
  return {
    getFileContent: (fileId: string, options?: FilesGetFileContentOptionalParams) =>
      getFileContent(context, fileId, options),
    getFile: (fileId: string, options?: FilesGetFileOptionalParams) =>
      getFile(context, fileId, options),
    deleteFile: (fileId: string, options?: FilesDeleteFileOptionalParams) =>
      deleteFile(context, fileId, options),
    uploadFile: (
      body: {
        file: FileContents | { contents: FileContents; contentType?: string; filename?: string };
        purpose: FilePurpose;
        filename?: string;
      },
      options?: FilesUploadFileOptionalParams,
    ) => uploadFile(context, body, options),
    listFiles: (options?: FilesListFilesOptionalParams) => listFiles(context, options),
  };
}

export function _getFilesOperations(context: AgentsContext): FilesOperations {
  return {
    ..._getFiles(context),
  };
}
