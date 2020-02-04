// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import {
  TextDocumentStatistics,
  TextAnalyticsError,
  DocumentSentimentValue,
  SentenceSentiment,
  SentimentScorePerLabel
} from "./generated/models";

/**
 * The result of the analyze sentiment operation on a single document.
 */
export type AnalyzeSentimentResult = AnalyzeSentimentSuccessResult | AnalyzeSentimentErrorResult;

/**
 *  The result of the analyze sentiment operation on a single document,
 *  containing the predicted sentiment for each sentence as well as for the full document.
 */
export interface AnalyzeSentimentSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Predicted sentiment for document. Possible values
   * include: 'positive', 'neutral', 'negative', 'mixed'
   */
  sentiment: DocumentSentimentValue;
  /**
   * Document level sentiment confidence scores between 0 and 1 for each sentiment class.
   */
  sentimentScores: SentimentScorePerLabel;
  /**
   * The predicted sentiment for each sentence in the corresponding document.
   */
  sentences: SentenceSentiment[];
}

/**
 * An error result from the analyze sentiment operation on a single document.
 */
export type AnalyzeSentimentErrorResult = TextAnalyticsErrorResult;

export function makeAnalyzeSentimentResult(
  id: string,
  sentiment: DocumentSentimentValue,
  sentimentScores: SentimentScorePerLabel,
  sentences: SentenceSentiment[],
  statistics?: TextDocumentStatistics
): AnalyzeSentimentSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    sentiment,
    sentimentScores,
    sentences
  };
}

export function makeAnalyzeSentimentErrorResult(
  id: string,
  error: TextAnalyticsError
): AnalyzeSentimentErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
