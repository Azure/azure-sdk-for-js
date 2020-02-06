// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentError,
  DocumentEntities,
  MultiLanguageInput
} from "./generated/models";
import {
  RecognizePiiEntitiesResult,
  makeRecognizePiiEntitiesResult,
  makeRecognizePiiEntitiesErrorResult
} from "./recognizePiiEntitiesResult";
import { sortByPreviousIdOrder } from "./util";

/**
 * Collection of `RecognizePiiEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizePiiEntitiesResultCollection extends Array<RecognizePiiEntitiesResult> {
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

export function makeRecognizePiiEntitiesResultCollection(
  input: MultiLanguageInput[],
  documents: DocumentEntities[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): RecognizePiiEntitiesResultCollection {
  const unsortedResult = documents
    .map(
      (document): RecognizePiiEntitiesResult => {
        return makeRecognizePiiEntitiesResult(document.id, document.entities, document.statistics);
      }
    )
    .concat(
      errors.map(
        (error): RecognizePiiEntitiesResult => {
          return makeRecognizePiiEntitiesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
