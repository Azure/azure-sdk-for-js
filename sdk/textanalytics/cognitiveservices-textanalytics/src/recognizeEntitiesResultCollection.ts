// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentError,
  DocumentEntities,
  MultiLanguageInput
} from "./generated/models";
import {
  RecognizeEntitiesResult,
  makeRecognizeEntitiesResult,
  makeRecognizeEntitiesErrorResult
} from "./recognizeEntitiesResult";
import { sortByPreviousIdOrder } from "./util";

/**
 * Collection of `RecognizeEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizeEntitiesResultCollection extends Array<RecognizeEntitiesResult> {
  /**
   * Gets statistics about the input document batch and how it was processed
   * by the service. This property will have a value when showStats is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * Gets the version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}

export function makeRecognizeEntitiesResultCollection(
  input: MultiLanguageInput[],
  documents: DocumentEntities[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): RecognizeEntitiesResultCollection {
  const unsortedResult = documents
    .map(
      (document): RecognizeEntitiesResult => {
        return makeRecognizeEntitiesResult(document.id, document.entities, document.statistics);
      }
    )
    .concat(
      errors.map(
        (error): RecognizeEntitiesResult => {
          return makeRecognizeEntitiesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
