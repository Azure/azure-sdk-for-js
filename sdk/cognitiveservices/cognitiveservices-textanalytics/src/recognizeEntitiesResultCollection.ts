// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestStatistics, DocumentError, DocumentEntities } from "./generated/models";
import {
  RecognizeEntitiesResult,
  makeRecognizeEntitiesResult,
  makeRecognizeEntitiesErrorResult
} from "./recognizeEntitiesResult";

export interface RecognizeEntitiesResultCollection extends Array<RecognizeEntitiesResult> {
  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the request payload.
   */
  statistics?: RequestStatistics;
  /**
   * This field indicates which model was used for scoring.
   */
  modelVersion: string;
}

export function makeRecognizeEntitiesResultCollection(
  documents: DocumentEntities[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: RequestStatistics
): RecognizeEntitiesResultCollection {
  const result = documents
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
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
