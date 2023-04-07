// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetLanguages200Response,
  GetLanguagesDefaultResponse,
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
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /languages": ["200"],
  "POST /translate": ["200"],
  "POST /transliterate": ["200"],
  "POST /breaksentence": ["200"],
  "POST /dictionary/lookup": ["200"],
  "POST /dictionary/examples": ["200"],
};

export function isUnexpected(
  response: GetLanguages200Response | GetLanguagesDefaultResponse
): response is GetLanguagesDefaultResponse;
export function isUnexpected(
  response: Translate200Response | TranslateDefaultResponse
): response is TranslateDefaultResponse;
export function isUnexpected(
  response: Transliterate200Response | TransliterateDefaultResponse
): response is TransliterateDefaultResponse;
export function isUnexpected(
  response:
    | FindSentenceBoundaries200Response
    | FindSentenceBoundariesDefaultResponse
): response is FindSentenceBoundariesDefaultResponse;
export function isUnexpected(
  response:
    | LookupDictionaryEntries200Response
    | LookupDictionaryEntriesDefaultResponse
): response is LookupDictionaryEntriesDefaultResponse;
export function isUnexpected(
  response:
    | LookupDictionaryExamples200Response
    | LookupDictionaryExamplesDefaultResponse
): response is LookupDictionaryExamplesDefaultResponse;
export function isUnexpected(
  response:
    | GetLanguages200Response
    | GetLanguagesDefaultResponse
    | Translate200Response
    | TranslateDefaultResponse
    | Transliterate200Response
    | TransliterateDefaultResponse
    | FindSentenceBoundaries200Response
    | FindSentenceBoundariesDefaultResponse
    | LookupDictionaryEntries200Response
    | LookupDictionaryEntriesDefaultResponse
    | LookupDictionaryExamples200Response
    | LookupDictionaryExamplesDefaultResponse
): response is
  | GetLanguagesDefaultResponse
  | TranslateDefaultResponse
  | TransliterateDefaultResponse
  | FindSentenceBoundariesDefaultResponse
  | LookupDictionaryEntriesDefaultResponse
  | LookupDictionaryExamplesDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  const pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    return true;
  }
  return !pathDetails.includes(response.status);
}
