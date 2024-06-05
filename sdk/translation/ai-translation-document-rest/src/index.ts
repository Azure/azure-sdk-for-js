// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import DocumentTranslationClient from "./documentTranslationClient.js";

export * from "./documentTranslationClient.js";
export * from "./parameters.js";
export * from "./responses.js";
export * from "./clientDefinitions.js";
export * from "./isUnexpected.js";
export * from "./models.js";
export * from "./outputModels.js";
export * from "./paginateHelper.js";
export * from "./pollingHelper.js";
export {
  createFile,
  createFileFromStream,
  type CreateFileOptions,
  type CreateFileFromStreamOptions,
} from "@azure/core-rest-pipeline";

export default DocumentTranslationClient;
