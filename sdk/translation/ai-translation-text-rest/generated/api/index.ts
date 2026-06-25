// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { transliterate, translate, getSupportedLanguages } from "./operations.js";
export type {
  TransliterateOptionalParams,
  TranslateOptionalParams,
  GetSupportedLanguagesOptionalParams,
} from "./options.js";
export type {
  TextTranslationContext,
  TextTranslationClientOptionalParams,
} from "./textTranslationContext.js";
export { createTextTranslation } from "./textTranslationContext.js";
