// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetSupportedLanguagesParameters,
  TranslateParameters,
  TransliterateParameters,
} from "./parameters.js";
import type {
  GetSupportedLanguages200Response,
  GetSupportedLanguagesDefaultResponse,
  Translate200Response,
  TranslateDefaultResponse,
  Transliterate200Response,
  TransliterateDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetSupportedLanguages {
  /** Gets the set of languages currently supported by other operations of the Translator. */
  get(
    options?: GetSupportedLanguagesParameters,
  ): StreamableMethod<GetSupportedLanguages200Response | GetSupportedLanguagesDefaultResponse>;
}

export interface Translate {
  /** Translate Text */
  post(
    options: TranslateParameters,
  ): StreamableMethod<Translate200Response | TranslateDefaultResponse>;
}

export interface Transliterate {
  /** Transliterate Text */
  post(
    options: TransliterateParameters,
  ): StreamableMethod<Transliterate200Response | TransliterateDefaultResponse>;
}

export interface Routes {
  /** Resource for '/languages' has methods for the following verbs: get */
  (path: "/languages"): GetSupportedLanguages;
  /** Resource for '/translate' has methods for the following verbs: post */
  (path: "/translate"): Translate;
  /** Resource for '/transliterate' has methods for the following verbs: post */
  (path: "/transliterate"): Transliterate;
}

export type TextTranslationClient = Client & {
  path: Routes;
};
