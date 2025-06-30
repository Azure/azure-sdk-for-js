// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FilePurpose } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { PollingOptionsParams } from "../options.js";

/** Optional parameters. */
export interface FilesGetFileContentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FilesGetFileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FilesDeleteFileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FilesUploadFileOptionalParams extends OperationOptions, PollingOptionsParams {
  /** The name of the file to be uploaded. */
  fileName?: string;
}

/** Optional parameters. */
export interface FilesListFilesOptionalParams extends OperationOptions {
  /** The purpose of the file. */
  purpose?: FilePurpose;
}
