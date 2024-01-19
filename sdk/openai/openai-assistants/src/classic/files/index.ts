// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  deleteFile,
  listFiles,
  retrieveFile,
  retrieveFileContent,
  uploadFile,
} from "../../api/files/index.js";
import {
  FileDeletionStatus,
  FileListResponse,
  FilePurpose,
  InputFile,
} from "../../models/models.js";
import {
  FilesDeleteFileOptions,
  FilesListFilesOptions,
  FilesRetrieveFileContentOptions,
  FilesRetrieveFileOptions,
  FilesUploadFileOptions,
} from "../../models/options.js";

export interface FilesOperations {
  listFiles: (options?: FilesListFilesOptions) => Promise<FileListResponse>;
  uploadFile: (
    file: Uint8Array,
    purpose: FilePurpose,
    options?: FilesUploadFileOptions
  ) => Promise<InputFile>;
  deleteFile: (fileId: string, options?: FilesDeleteFileOptions) => Promise<FileDeletionStatus>;
  retrieveFile: (fileId: string, options?: FilesRetrieveFileOptions) => Promise<InputFile>;
  retrieveFileContent: (
    fileId: string,
    options?: FilesRetrieveFileContentOptions
  ) => Promise<Uint8Array>;
}

export function getFiles(context: AssistantsContext): FilesOperations {
  return {
    listFiles: (options?: FilesListFilesOptions) => listFiles(context, options),
    uploadFile: (file: Uint8Array, purpose: FilePurpose, options?: FilesUploadFileOptions) =>
      uploadFile(context, file, purpose, options),
    deleteFile: (fileId: string, options?: FilesDeleteFileOptions) =>
      deleteFile(context, fileId, options),
    retrieveFile: (fileId: string, options?: FilesRetrieveFileOptions) =>
      retrieveFile(context, fileId, options),
    retrieveFileContent: (fileId: string, options?: FilesRetrieveFileContentOptions) =>
      retrieveFileContent(context, fileId, options),
  };
}

export function getFilesOperations(context: AssistantsContext): FilesOperations {
  return {
    ...getFiles(context),
  };
}
