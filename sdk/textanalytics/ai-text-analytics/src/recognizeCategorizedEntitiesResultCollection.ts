// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentError,
  DocumentEntities,
  MultiLanguageInput
} from "./generated/models";
import {
  RecognizeCategorizedEntitiesResult,
  makeRecognizeCategorizedEntitiesResult,
  makeRecognizeCategorizedEntitiesErrorResult
} from "./recognizeCategorizedEntitiesResult";
import { sortByPreviousIdOrder } from "./util";

/**
 * Collection of `RecognizeCategorizedEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizeCategorizedEntitiesResultCollection
  extends Array<RecognizeCategorizedEntitiesResult> {
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

export function makeRecognizeCategorizedEntitiesResultCollection(
  input: MultiLanguageInput[],
  documents: DocumentEntities[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): RecognizeCategorizedEntitiesResultCollection {
  const unsortedResult = documents
    .map(
      (document): RecognizeCategorizedEntitiesResult => {
        return makeRecognizeCategorizedEntitiesResult(
          document.id,
          document.entities,
          document.statistics
        );
      }
    )
    .concat(
      errors.map(
        (error): RecognizeCategorizedEntitiesResult => {
          return makeRecognizeCategorizedEntitiesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
