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

export interface RecognizeLinkedEntitiesResultCollection
  extends Array<RecognizeLinkedEntitiesResult> {
  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the request payload.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * This field indicates which model was used for scoring.
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
