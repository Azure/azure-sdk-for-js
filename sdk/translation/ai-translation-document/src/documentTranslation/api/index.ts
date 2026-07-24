// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  DocumentTranslationContext,
  DocumentTranslationClientOptionalParams,
} from "./documentTranslationContext.js";
export { createDocumentTranslation } from "./documentTranslationContext.js";
export {
  getSupportedFormats,
  getDocumentsStatus,
  cancelTranslation,
  getTranslationStatus,
  getDocumentStatus,
  getTranslationsStatus,
  startTranslation,
} from "./operations.js";
export type {
  GetSupportedFormatsOptionalParams,
  GetDocumentsStatusOptionalParams,
  CancelTranslationOptionalParams,
  GetTranslationStatusOptionalParams,
  GetDocumentStatusOptionalParams,
  GetTranslationsStatusOptionalParams,
  StartTranslationOptionalParams,
} from "./options.js";
