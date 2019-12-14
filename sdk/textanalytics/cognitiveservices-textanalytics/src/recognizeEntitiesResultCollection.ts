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

export interface RecognizeEntitiesResultCollection extends Array<RecognizeEntitiesResult> {
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
