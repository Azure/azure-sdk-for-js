// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
    GeneratedClientEntitiesRecognitionGeneralResponse,
    EntitiesResult,
    TextDocumentInput
  } from "./generated/models";

import { RecognizeCategorizedEntitiesResultArray, makeRecognizeCategorizedEntitiesResultArray } from './recognizeCategorizedEntitiesResultArray';

/**
 * Contains response data for the Recognize Categorized Entities operation.
 */
export type RecognizeCategorizedEntitieseResultResponse = RecognizeCategorizedEntitiesResultArray & {
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
        parsedBody: EntitiesResult;
      };
  };

export function toRecognizeCategorizedEntitiesResultResponse(
    input: TextDocumentInput[],
    response: GeneratedClientEntitiesRecognitionGeneralResponse
): RecognizeCategorizedEntitieseResultResponse {
    return Object.defineProperty(
      makeRecognizeCategorizedEntitiesResultArray(input, response),
      "_response",
      {
        value: response._response,
        enumerable: false
      }
    );
}
