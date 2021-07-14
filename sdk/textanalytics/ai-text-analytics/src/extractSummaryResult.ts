// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import {
  TextAnalyticsError,
  ExtractedDocumentSummary,
  ExtractedSummarySentence as GeneratedSummarySentences
} from "./generated/models";

/**
 * The result of the extract summary operation on a single document.
 */
export type ExtractSummarySentencesResult = ExtractSummarySentencesSuccessResult | ExtractSummarySentencesErrorResult;

/**
 * The result of the extract summary operation on a single document,
 * containing a collection of the summary identified in that document.
 */
export interface ExtractSummarySentencesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * A list of sentences composing a summary of the input document.
   */
  summarySentences: SummarySentence[];
}

/**
 * An extracted sentence as part of the summary of a document.
 */
export interface SummarySentence {
  /** The extracted sentence text. */
  text: string;
  /** A double value representing the relevance of the sentence within the summary. Higher values indicate higher importance. */
  importanceScore: number;
  /** The sentence offset from the start of the document, based on the value of the stringIndexType parameter. */
  offset: number;
  /** The length of the sentence. */
  length: number;
}

/**
 * An error result from the extract summary operation on a single document.
 */
export type ExtractSummarySentencesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeExtractSummaryResult(
  result: ExtractedDocumentSummary
): ExtractSummarySentencesSuccessResult {
  const { id, warnings, statistics, sentences } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    summarySentences: sentences.map((sentence: GeneratedSummarySentences) => ({
      ...sentence,
      importanceScore: sentence.rankScore
    }))
  };
}

/**
 * @internal
 */
export function makeExtractSummaryErrorResult(
  id: string,
  error: TextAnalyticsError
): ExtractSummarySentencesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
