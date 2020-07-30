// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import {
  TextDocumentStatistics,
  TextAnalyticsError,
  DocumentSentimentLabel,
  SentenceSentiment,
  SentimentConfidenceScores,
  TextAnalyticsWarning
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
  sentiment: DocumentSentimentLabel;
  /**
   * Document level sentiment confidence scores between 0 and 1 for each sentiment class.
   */
  confidenceScores: SentimentConfidenceScores;
  /**
   * The predicted sentiment for each sentence in the corresponding document.
   */
  sentences: SentenceSentiment[];
}

export interface AspectSentiment {
  /**
   * AspectSentiment contains the related opinions, predicted sentiment,
   * confidence scores and other information about an aspect of a product.
   * An aspect of a product/service is a key component of that product/service.
   * For example in "The food at Hotel Foo is good", "food" is an aspect of
   * "Hotel Foo".
   */
  confidenceScores: SentimentConfidenceScores;
  length: number;
  offset: number;
  sentiment: DocumentSentimentLabel;
  text: string;
}

export interface OpinionSentiment {
  confidenceScores: SentimentConfidenceScores;
  isNegated: boolean;
  length: number;
  offset: number;
  sentiment: DocumentSentimentLabel;
  text: string;
}

export interface MinedOpinion {
  aspect: AspectSentiment;
  opinions: OpinionSentiment[];
}

/**
 * An error result from the analyze sentiment operation on a single document.
 */
export type AnalyzeSentimentErrorResult = TextAnalyticsErrorResult;

export function makeAnalyzeSentimentResult(
  id: string,
  sentiment: DocumentSentimentLabel,
  confidenceScores: SentimentConfidenceScores,
  sentences: SentenceSentiment[],
  warnings: TextAnalyticsWarning[],
  statistics?: TextDocumentStatistics
): AnalyzeSentimentSuccessResult {
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    sentiment,
    confidenceScores,
    sentences
  };
}

export function makeAnalyzeSentimentErrorResult(
  id: string,
  error: TextAnalyticsError
): AnalyzeSentimentErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
