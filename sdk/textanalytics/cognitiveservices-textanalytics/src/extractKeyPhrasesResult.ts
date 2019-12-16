// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { TextDocumentStatistics, TextAnalyticsError } from "./generated/models";

export type ExtractKeyPhrasesResult = ExtractKeyPhrasesSuccessResult | ExtractKeyPhrasesErrorResult;

export interface ExtractKeyPhrasesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * A list of representative words or phrases. The number of key phrases returned is proportional
   * to the number of words in the input document.
   */
  keyPhrases: string[];
}

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
