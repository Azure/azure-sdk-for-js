// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  FilePurpose,
  FileListResponse,
  InputFile,
  FileDeletionStatus,
} from "../../models/models.js";
import {
  listFiles,
  uploadFile,
  deleteFile,
  retrieveFile,
  retrieveFileContent,
} from "../../api/files/index.js";
import {
  FilesListFilesOptions,
  FilesUploadFileOptions,
  FilesDeleteFileOptions,
  FilesRetrieveFileOptions,
  FilesRetrieveFileContentOptions,
} from "../../models/options.js";

export interface FilesOperations {
  listFiles: (options?: FilesListFilesOptions) => Promise<FileListResponse>;
  uploadFile: (
    file: Uint8Array,
    purpose: FilePurpose,
    options?: FilesUploadFileOptions
  ) => Promise<InputFile>;
  deleteFile: (
    fileId: string,
    options?: FilesDeleteFileOptions
  ) => Promise<FileDeletionStatus>;
  retrieveFile: (
    fileId: string,
    options?: FilesRetrieveFileOptions
  ) => Promise<InputFile>;
  retrieveFileContent: (
    fileId: string,
    options?: FilesRetrieveFileContentOptions
  ) => Promise<Uint8Array>;
}

export function getFiles(context: AssistantsContext) {
  return {
    listFiles: (options?: FilesListFilesOptions) => listFiles(context, options),
    uploadFile: (
      file: Uint8Array,
      purpose: FilePurpose,
      options?: FilesUploadFileOptions
    ) => uploadFile(context, file, purpose, options),
    deleteFile: (fileId: string, options?: FilesDeleteFileOptions) =>
      deleteFile(context, fileId, options),
    retrieveFile: (fileId: string, options?: FilesRetrieveFileOptions) =>
      retrieveFile(context, fileId, options),
    retrieveFileContent: (
      fileId: string,
      options?: FilesRetrieveFileContentOptions
    ) => retrieveFileContent(context, fileId, options),
  };
}

export function getFilesOperations(
  context: AssistantsContext
): FilesOperations {
  return {
    ...getFiles(context),
  };
}
