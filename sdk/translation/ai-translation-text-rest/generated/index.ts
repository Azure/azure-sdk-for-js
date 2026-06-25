// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { TextTranslationClient } from "./textTranslationClient.js";
export type {
  GetSupportedLanguagesResult,
  TranslationLanguage,
  LanguageDirectionality,
  TransliterationLanguage,
  TransliterableScript,
  LanguageScript,
  ErrorResponse,
  ErrorDetails,
  TranslateBody,
  TranslateInputItem,
  TextType,
  TranslationTarget,
  ProfanityAction,
  ProfanityMarker,
  TranslationTone,
  TranslationGender,
  ReferenceTextPair,
  TranslationResult,
  TranslatedTextItem,
  DetectedLanguage,
  TranslationText,
  TransliterateBody,
  InputTextItem,
  TransliterateResult,
  TransliteratedText,
} from "./models/index.js";
export { KnownAPIVersion } from "./models/index.js";
export type {
  TransliterateOptionalParams,
  TranslateOptionalParams,
  GetSupportedLanguagesOptionalParams,
  TextTranslationClientOptionalParams,
} from "./api/index.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
