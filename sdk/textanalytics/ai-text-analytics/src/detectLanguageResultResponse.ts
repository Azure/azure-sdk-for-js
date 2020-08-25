// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
    GeneratedClientLanguagesResponse,
    LanguageResult,
    TextDocumentInput
  } from "./generated/models";

import { DetectLanguageResultArray, makeDetectLanguageResultArray } from './detectLanguageResultArray';

/**
 * Contains response data for the Detect Language operation.
 */
export type DetectLanguageResultResponse = DetectLanguageResultArray & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
    
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: LanguageResult;
      };
  };

export function toDetectLanguageResultResponse(
    input: TextDocumentInput[],
    response: GeneratedClientLanguagesResponse
): DetectLanguageResultResponse {
    return Object.defineProperty(makeDetectLanguageResultArray(input, response), "_response", {
      value: response._response,
      enumerable: false
    });
}
