// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestStatistics, DocumentError, DocumentSentiment } from "./generated/models";
import {
  AnalyzeSentimentResult,
  makeAnalyzeSentimentResult,
  makeAnalyzeSentimentErrorResult
} from "./analyzeSentimentResult";

export interface AnalyzeSentimentResultCollection extends Array<AnalyzeSentimentResult> {
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

export function makeAnalyzeSentimentResultCollection(
  documents: DocumentSentiment[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: RequestStatistics
): AnalyzeSentimentResultCollection {
  const result = documents
    .map(
      (document): AnalyzeSentimentResult => {
        return makeAnalyzeSentimentResult(
          document.id,
          document.sentiment,
          document.documentScores,
          document.sentences,
          document.statistics
        );
      }
    )
    .concat(
      errors.map(
        (error): AnalyzeSentimentResult => {
          return makeAnalyzeSentimentErrorResult(error.id, error.error);
        }
      )
    );
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
