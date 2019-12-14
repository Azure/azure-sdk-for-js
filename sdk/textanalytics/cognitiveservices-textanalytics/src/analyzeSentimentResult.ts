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
  SentimentConfidenceScorePerLabel
} from "./generated/models";

export type AnalyzeSentimentResult = AnalyzeSentimentSuccessResult | AnalyzeSentimentErrorResult;

export interface AnalyzeSentimentSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Predicted sentiment for document (Negative, Neutral, Positive, or Mixed). Possible values
   * include: 'positive', 'neutral', 'negative', 'mixed'
   */
  sentiment: DocumentSentimentValue;
  /**
   * Document level sentiment confidence scores between 0 and 1 for each sentiment class.
   */
  documentScores: SentimentConfidenceScorePerLabel;
  /**
   * Sentence level sentiment analysis.
   */
  sentences: SentenceSentiment[];
}

export interface AnalyzeSentimentErrorResult extends TextAnalyticsErrorResult {}

export function makeAnalyzeSentimentResult(
  id: string,
  sentiment: DocumentSentimentValue,
  documentScores: SentimentConfidenceScorePerLabel,
  sentences: SentenceSentiment[],
  statistics?: TextDocumentStatistics
): AnalyzeSentimentSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    sentiment,
    documentScores,
    sentences
  };
}

export function makeAnalyzeSentimentErrorResult(
  id: string,
  error: TextAnalyticsError
): AnalyzeSentimentErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
