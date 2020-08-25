// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
    EntityLinkingResult,
    GeneratedClientEntitiesLinkingResponse,
    TextDocumentInput
  } from "./generated/models";

import { RecognizeLinkedEntitiesResultArray, makeRecognizeLinkedEntitiesResultArray } from './recognizeLinkedEntitiesResultArray';

/**
 * Contains response data for the Recognize Linked Entities operation.
 */
export type RecognizeLinkedEntitiesResultResponse = RecognizeLinkedEntitiesResultArray & {
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
        parsedBody: EntityLinkingResult;
      };
  };

export function toRecognizeLinkedEntitiesResultResponse(
    input: TextDocumentInput[],
    response: GeneratedClientEntitiesLinkingResponse
): RecognizeLinkedEntitiesResultResponse {
    return Object.assign(makeRecognizeLinkedEntitiesResultArray(input, response), {
        _response: response._response
    });
}
