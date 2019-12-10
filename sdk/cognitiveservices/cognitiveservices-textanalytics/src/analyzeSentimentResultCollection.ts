// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestStatistics,
  DocumentError,
  DocumentSentiment,
  MultiLanguageInput
} from "./generated/models";
import {
  AnalyzeSentimentResult,
  makeAnalyzeSentimentResult,
  makeAnalyzeSentimentErrorResult
} from "./analyzeSentimentResult";
import { sortByPreviousIdOrder } from "./util";

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
  input: MultiLanguageInput[],
  documents: DocumentSentiment[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: RequestStatistics
): AnalyzeSentimentResultCollection {
  const unsortedResult = documents
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
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
