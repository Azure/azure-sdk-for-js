// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClientOptionalParams } from "./aiProjectContext.js";
export { createAIProject, AIProjectContext } from "./aiProjectContext.js";

export { AIProjectClientOptionalParams };

/** Options for uploading datasets */
export interface DatasetUploadOptions {
  /**  The name of an Azure Storage Account connection, where the file should be uploaded. If not specified, the default Azure Storage Account connection will be used.  */
  connectionName?: string;
  /** Only for folder uploads. A regex pattern to filter files to be uploaded. Only files matching the pattern will be uploaded. If not specified, all files will be uploaded. */
  filePattern?: RegExp;
}

/**
 * @internal
 * Options for dataset upload operations that are internal and may not be exposed to all users
 */
export interface DatasetUploadInternalOptions extends DatasetUploadOptions {
  projectOptions?: AIProjectClientOptionalParams;
}
