// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestStatistics, DocumentError, DocumentLinkedEntities } from "./generated/models";
import {
  ExtractLinkedEntitiesResult,
  makeExtractLinkedEntitiesResult,
  makeExtractLinkedEntitiesErrorResult
} from "./extractLinkedEntitiesResult";

export interface ExtractLinkedEntitiesResultCollection extends Array<ExtractLinkedEntitiesResult> {
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

export function makeExtractLinkedEntitiesResultCollection(
  documents: DocumentLinkedEntities[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: RequestStatistics
): ExtractLinkedEntitiesResultCollection {
  const result = documents
    .map(
      (document): ExtractLinkedEntitiesResult => {
        return makeExtractLinkedEntitiesResult(document.id, document.entities, document.statistics);
      }
    )
    .concat(
      errors.map(
        (error): ExtractLinkedEntitiesResult => {
          return makeExtractLinkedEntitiesErrorResult(error.id, error.error);
        }
      )
    );
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
