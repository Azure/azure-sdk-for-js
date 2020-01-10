// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentError,
  DocumentLinkedEntities,
  MultiLanguageInput
} from "./generated/models";
import {
  RecognizeLinkedEntitiesResult,
  makeRecognizeLinkedEntitiesResult,
  makeRecognizeLinkedEntitiesErrorResult
} from "./recognizeLinkedEntitiesResult";
import { sortByPreviousIdOrder } from "./util";

/**
 * Collection of `RecognizeLinkedEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizeLinkedEntitiesResultCollection
  extends Array<RecognizeLinkedEntitiesResult> {
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

export function makeRecognizeLinkedEntitiesResultCollection(
  input: MultiLanguageInput[],
  documents: DocumentLinkedEntities[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): RecognizeLinkedEntitiesResultCollection {
  const unsortedResult = documents
    .map(
      (document): RecognizeLinkedEntitiesResult => {
        return makeRecognizeLinkedEntitiesResult(
          document.id,
          document.entities,
          document.statistics
        );
      }
    )
    .concat(
      errors.map(
        (error): RecognizeLinkedEntitiesResult => {
          return makeRecognizeLinkedEntitiesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
