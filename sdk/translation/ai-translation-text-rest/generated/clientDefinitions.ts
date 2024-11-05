// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GetSupportedLanguagesParameters,
  TranslateParameters,
  TransliterateParameters,
  FindSentenceBoundariesParameters,
  LookupDictionaryEntriesParameters,
  LookupDictionaryExamplesParameters,
} from "./parameters.js";
import {
  GetSupportedLanguages200Response,
  GetSupportedLanguagesDefaultResponse,
  Translate200Response,
  TranslateDefaultResponse,
  Transliterate200Response,
  TransliterateDefaultResponse,
  FindSentenceBoundaries200Response,
  FindSentenceBoundariesDefaultResponse,
  LookupDictionaryEntries200Response,
  LookupDictionaryEntriesDefaultResponse,
  LookupDictionaryExamples200Response,
  LookupDictionaryExamplesDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetSupportedLanguages {
  /** Gets the set of languages currently supported by other operations of the Translator. */
  get(
    options?: GetSupportedLanguagesParameters,
  ): StreamableMethod<
    GetSupportedLanguages200Response | GetSupportedLanguagesDefaultResponse
  >;
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

export interface FindSentenceBoundaries {
  /** Find Sentence Boundaries */
  post(
    options: FindSentenceBoundariesParameters,
  ): StreamableMethod<
    FindSentenceBoundaries200Response | FindSentenceBoundariesDefaultResponse
  >;
}

export interface LookupDictionaryEntries {
  /** Lookup Dictionary Entries */
  post(
    options: LookupDictionaryEntriesParameters,
  ): StreamableMethod<
    LookupDictionaryEntries200Response | LookupDictionaryEntriesDefaultResponse
  >;
}

export interface LookupDictionaryExamples {
  /** Lookup Dictionary Examples */
  post(
    options: LookupDictionaryExamplesParameters,
  ): StreamableMethod<
    | LookupDictionaryExamples200Response
    | LookupDictionaryExamplesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/languages' has methods for the following verbs: get */
  (path: "/languages"): GetSupportedLanguages;
  /** Resource for '/translate' has methods for the following verbs: post */
  (path: "/translate"): Translate;
  /** Resource for '/transliterate' has methods for the following verbs: post */
  (path: "/transliterate"): Transliterate;
  /** Resource for '/breaksentence' has methods for the following verbs: post */
  (path: "/breaksentence"): FindSentenceBoundaries;
  /** Resource for '/dictionary/lookup' has methods for the following verbs: post */
  (path: "/dictionary/lookup"): LookupDictionaryEntries;
  /** Resource for '/dictionary/examples' has methods for the following verbs: post */
  (path: "/dictionary/examples"): LookupDictionaryExamples;
}

export type TextTranslationClient = Client & {
  path: Routes;
};
