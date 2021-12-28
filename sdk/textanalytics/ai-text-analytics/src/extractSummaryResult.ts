// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult,
} from "./textAnalyticsResult";
import {
  TextAnalyticsError,
  ExtractedDocumentSummary,
  ExtractedSummarySentence as GeneratedSummarySentences,
} from "./generated/models";

/**
 * The result of the extract summary operation on a single document.
 */
export type ExtractSummaryResult = ExtractSummarySuccessResult | ExtractSummaryErrorResult;

/**
 * The result of the extract summary operation on a single document,
 * containing a collection of the summary identified in that document.
 */
export interface ExtractSummarySuccessResult extends TextAnalyticsSuccessResult {
  /**
   * A list of sentences composing a summary of the input document.
   */
  sentences: SummarySentence[];
}

/**
 * An extracted sentence as part of the summary of a document.
 */
export interface SummarySentence {
  /** The extracted sentence text. */
  text: string;
  /** A double value representing the relevance of the sentence within the summary. Higher values indicate higher importance. */
  rankScore: number;
  /** The sentence offset from the start of the document, based on the value of the stringIndexType parameter. */
  offset: number;
  /** The length of the sentence. */
  length: number;
}

/**
 * An error result from the extract summary operation on a single document.
 */
export type ExtractSummaryErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeExtractSummaryResult(
  result: ExtractedDocumentSummary
): ExtractSummarySuccessResult {
  const { id, warnings, statistics, sentences } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    sentences: sentences.map((sentence: GeneratedSummarySentences) => ({
      ...sentence,
    })),
  };
}

/**
 * @internal
 */
export function makeExtractSummaryErrorResult(
  id: string,
  error: TextAnalyticsError
): ExtractSummaryErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
