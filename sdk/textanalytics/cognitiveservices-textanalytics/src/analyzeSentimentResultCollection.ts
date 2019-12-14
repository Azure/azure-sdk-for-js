// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
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
  statistics?: TextDocumentBatchStatistics;
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
  statistics?: TextDocumentBatchStatistics
): AnalyzeSentimentResultCollection {
  const unsortedResult = documents
    .map(
      (document): AnalyzeSentimentResult => {
        return makeAnalyzeSentimentResult(
          document.id,
          document.sentiment,
          document.documentScores,
          document.sentenceSentiments,
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
