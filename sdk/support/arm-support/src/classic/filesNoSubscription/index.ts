// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { upload, list, create, get } from "../../api/filesNoSubscription/operations.js";
import type {
  FilesNoSubscriptionUploadOptionalParams,
  FilesNoSubscriptionListOptionalParams,
  FilesNoSubscriptionCreateOptionalParams,
  FilesNoSubscriptionGetOptionalParams,
} from "../../api/filesNoSubscription/options.js";
import type { FileDetails, UploadFile } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FilesNoSubscription operations. */
export interface FilesNoSubscriptionOperations {
  /** This API allows you to upload content to a file */
  upload: (
    fileWorkspaceName: string,
    fileName: string,
    uploadFile: UploadFile,
    options?: FilesNoSubscriptionUploadOptionalParams,
  ) => Promise<void>;
  /** Lists all the Files information under a workspace for an Azure subscription. */
  list: (
    fileWorkspaceName: string,
    options?: FilesNoSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<FileDetails>;
  /** Creates a new file under a workspace. */
  create: (
    fileWorkspaceName: string,
    fileName: string,
    createFileParameters: FileDetails,
    options?: FilesNoSubscriptionCreateOptionalParams,
  ) => Promise<FileDetails>;
  /** Returns details of a specific file in a work space. */
  get: (
    fileWorkspaceName: string,
    fileName: string,
    options?: FilesNoSubscriptionGetOptionalParams,
  ) => Promise<FileDetails>;
}

function _getFilesNoSubscription(context: MicrosoftSupportContext) {
  return {
    upload: (
      fileWorkspaceName: string,
      fileName: string,
      uploadFile: UploadFile,
      options?: FilesNoSubscriptionUploadOptionalParams,
    ) => upload(context, fileWorkspaceName, fileName, uploadFile, options),
    list: (fileWorkspaceName: string, options?: FilesNoSubscriptionListOptionalParams) =>
      list(context, fileWorkspaceName, options),
    create: (
      fileWorkspaceName: string,
      fileName: string,
      createFileParameters: FileDetails,
      options?: FilesNoSubscriptionCreateOptionalParams,
    ) => create(context, fileWorkspaceName, fileName, createFileParameters, options),
    get: (
      fileWorkspaceName: string,
      fileName: string,
      options?: FilesNoSubscriptionGetOptionalParams,
    ) => get(context, fileWorkspaceName, fileName, options),
  };
}

export function _getFilesNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): FilesNoSubscriptionOperations {
  return {
    ..._getFilesNoSubscription(context),
  };
}
