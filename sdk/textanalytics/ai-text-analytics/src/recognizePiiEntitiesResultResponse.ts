// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
    GeneratedClientEntitiesRecognitionPiiResponse,
    EntitiesResult,
    TextDocumentInput
  } from "./generated/models";

import { RecognizePiiEntitiesResultArray, makeRecognizePiiEntitiesResultArray } from './recognizePiiEntitiesResultArray';

/**
 * Contains response data for the Recognize Pii Entities operation.
 */
export type RecognizePiiEntitiesResultResponse = RecognizePiiEntitiesResultArray & {
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

export function toRecognizePiiEntitiesResultResponse(
    input: TextDocumentInput[],
    response: GeneratedClientEntitiesRecognitionPiiResponse
): RecognizePiiEntitiesResultResponse {
    return Object.assign(makeRecognizePiiEntitiesResultArray(input, response), {
        _response: response._response
    });
}
