// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { upload, list, create, get } from "../../api/files/operations.js";
import {
  FilesUploadOptionalParams,
  FilesListOptionalParams,
  FilesCreateOptionalParams,
  FilesGetOptionalParams,
} from "../../api/files/options.js";
import { FileDetails, UploadFile } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Files operations. */
export interface FilesOperations {
  /** This API allows you to upload content to a file */
  upload: (
    fileWorkspaceName: string,
    fileName: string,
    uploadFile: UploadFile,
    options?: FilesUploadOptionalParams,
  ) => Promise<void>;
  /** Lists all the Files information under a workspace for an Azure subscription. */
  list: (
    fileWorkspaceName: string,
    options?: FilesListOptionalParams,
  ) => PagedAsyncIterableIterator<FileDetails>;
  /** Creates a new file under a workspace for the specified subscription. */
  create: (
    fileWorkspaceName: string,
    fileName: string,
    createFileParameters: FileDetails,
    options?: FilesCreateOptionalParams,
  ) => Promise<FileDetails>;
  /** Returns details of a specific file in a work space. */
  get: (
    fileWorkspaceName: string,
    fileName: string,
    options?: FilesGetOptionalParams,
  ) => Promise<FileDetails>;
}

function _getFiles(context: MicrosoftSupportContext) {
  return {
    upload: (
      fileWorkspaceName: string,
      fileName: string,
      uploadFile: UploadFile,
      options?: FilesUploadOptionalParams,
    ) => upload(context, fileWorkspaceName, fileName, uploadFile, options),
    list: (fileWorkspaceName: string, options?: FilesListOptionalParams) =>
      list(context, fileWorkspaceName, options),
    create: (
      fileWorkspaceName: string,
      fileName: string,
      createFileParameters: FileDetails,
      options?: FilesCreateOptionalParams,
    ) => create(context, fileWorkspaceName, fileName, createFileParameters, options),
    get: (fileWorkspaceName: string, fileName: string, options?: FilesGetOptionalParams) =>
      get(context, fileWorkspaceName, fileName, options),
  };
}

export function _getFilesOperations(context: MicrosoftSupportContext): FilesOperations {
  return {
    ..._getFiles(context),
  };
}
