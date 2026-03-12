// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";
import type { AIProjectClientOptionalParams } from "./aiProjectContext.js";
export { createAIProject, type AIProjectContext } from "./aiProjectContext.js";

export type { AIProjectClientOptionalParams };

/** Options for uploading datasets */
export interface DatasetUploadOptions extends OperationOptions {
  /**  The name of an Azure Storage Account connection, where the file should be uploaded. If not specified, the default Azure Storage Account connection will be used.  */
  connectionName?: string;
  /** Only for folder uploads. A regex pattern to filter files to be uploaded. Only files matching the pattern will be uploaded. If not specified, all files will be uploaded. */
  filePattern?: string;
}

/**
 * @internal
 * Options for dataset upload operations that are internal and may not be exposed to all users
 */
export interface DatasetUploadInternalOptions extends DatasetUploadOptions {
  projectOptions?: AIProjectClientOptionalParams;
}
