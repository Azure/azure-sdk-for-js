// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
    GeneratedClientSentimentResponse,
    SentimentResponse,
    TextDocumentInput
  } from "./generated/models";

import { AnalyzeSentimentResultArray, makeAnalyzeSentimentResultArray } from './analyzeSentimentResultArray';

/**
 * Contains response data for the Analyze Sentiment operation.
 */
export type AnalyzeSentimentResultResponse = AnalyzeSentimentResultArray & {
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
        parsedBody: SentimentResponse;
      };
  };

export function toAnalyzeSentimentResultResponse(
    input: TextDocumentInput[],
    response: GeneratedClientSentimentResponse
): AnalyzeSentimentResultResponse {
    return Object.defineProperty(makeAnalyzeSentimentResultArray(input, response), "_response", {
      value: response._response,
      enumerable: false
    });
}
