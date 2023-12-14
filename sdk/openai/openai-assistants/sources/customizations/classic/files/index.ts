// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FileListResponse, InputFile } from "../../models/models.js";
import { FilePurpose, FileDeletionStatus } from "../../../generated/src/models/models.js";
import {
  FilesListFilesOptions,
  FilesUploadFileOptions,
  FilesDeleteFileOptions,
  FilesRetrieveFileOptions,
  FilesRetrieveFileContentOptions,
} from "../../../generated/src/models/options.js";

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
