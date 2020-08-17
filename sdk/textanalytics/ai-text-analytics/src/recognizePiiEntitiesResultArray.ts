// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput, GeneratedClientEntitiesRecognitionPiiResponse
} from "./generated/models";
import {
  RecognizePiiEntitiesResult,
  makeRecognizePiiEntitiesResult,
  makeRecognizePiiEntitiesErrorResult
} from "./recognizePiiEntitiesResult";
import { sortResponseIdObjects } from "./util";

/**
 * Collection of `RecognizePiiEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizePiiEntitiesResultArray extends Array<RecognizePiiEntitiesResult> {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}

export function makeRecognizePiiEntitiesResultArray(
  input: TextDocumentInput[],
  response: GeneratedClientEntitiesRecognitionPiiResponse
): RecognizePiiEntitiesResultArray {
  const { documents, errors, statistics, modelVersion} = response;
  const unsortedResult = documents
    .map(
      (document): RecognizePiiEntitiesResult => {
        return makeRecognizePiiEntitiesResult(document);
      }
    )
    .concat(
      errors.map(
        (error): RecognizePiiEntitiesResult => {
          return makeRecognizePiiEntitiesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortResponseIdObjects(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
