// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
    GeneratedClientKeyPhrasesResponse,
    TextDocumentInput, 
    KeyPhraseResult
  } from "./generated/models";

import { ExtractKeyPhrasesResultArray, makeExtractKeyPhrasesResultArray } from './extractKeyPhrasesResultArray';

/**
 * Contains response data for the Recognize Categorized Entities operation.
 */
export type ExtractKeyPhraseseResultResponse = ExtractKeyPhrasesResultArray & {
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
        parsedBody: KeyPhraseResult;
      };
  };

export function toExtractKeyPhrasesResultResponse(
    input: TextDocumentInput[],
    response: GeneratedClientKeyPhrasesResponse
): ExtractKeyPhraseseResultResponse {
    return Object.assign(makeExtractKeyPhrasesResultArray(input, response), {
        _response: response._response
    });
}
