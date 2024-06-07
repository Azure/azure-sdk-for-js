// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import DocumentTranslationClient from "./documentTranslationClient";

export * from "./documentTranslationClient";
export * from "./parameters";
export * from "./responses";
export * from "./clientDefinitions";
export * from "./isUnexpected";
export * from "./models";
export * from "./outputModels";
export * from "./paginateHelper";
export * from "./pollingHelper";
export {
  createFile,
  createFileFromStream,
  type CreateFileOptions,
  type CreateFileFromStreamOptions,
} from "@azure/core-rest-pipeline";

export default DocumentTranslationClient;
