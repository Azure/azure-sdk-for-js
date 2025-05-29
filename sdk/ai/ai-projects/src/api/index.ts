// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AIProjectClientOptionalParams } from "./aiProjectContext.js";
export { createAIProject, AIProjectContext } from "./aiProjectContext.js";

export { AIProjectClientOptionalParams };

export interface DatasetUploadOptionalParams {
  // Optional connection name for the storage account to be used
  connectionName?: string;
  projectOptions?: AIProjectClientOptionalParams;
}
