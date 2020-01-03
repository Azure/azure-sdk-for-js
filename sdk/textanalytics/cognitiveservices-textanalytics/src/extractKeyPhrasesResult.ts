// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { TextDocumentStatistics, TextAnalyticsError } from "./generated/models";

/**
 * The result of the extract key phrases operation on a single document.
 */
export type ExtractKeyPhrasesResult = ExtractKeyPhrasesSuccessResult | ExtractKeyPhrasesErrorResult;

/**
 * The result of the extract key phrases operation on a single document,
 * containing a collection of the key phrases identified in that document.
 */
export interface ExtractKeyPhrasesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * A list of representative words or phrases. The number of key phrases returned is proportional
   * to the number of words in the input document.
   */
  keyPhrases: string[];
}

/**
 * An error result from the extract key phrases operation on a single document.
 */
export interface ExtractKeyPhrasesErrorResult extends TextAnalyticsErrorResult {}

export function makeExtractKeyPhrasesResult(
  id: string,
  keyPhrases: string[],
  statistics?: TextDocumentStatistics
): ExtractKeyPhrasesSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    keyPhrases
  };
}

export function makeExtractKeyPhrasesErrorResult(
  id: string,
  error: TextAnalyticsError
): ExtractKeyPhrasesErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
