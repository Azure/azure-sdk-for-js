// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { DetectedLanguage, TextDocumentStatistics, TextAnalyticsError } from "./generated/models";

export type DetectLanguageResult = DetectLanguageSuccessResult | DetectLanguageErrorResult;

export interface DetectLanguageSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * All detected languages.
   */
  readonly detectedLanguages: DetectedLanguage[];
  /**
   * The top language by confidence score.
   */
  readonly primaryLanguage: DetectedLanguage;
}

export interface DetectLanguageErrorResult extends TextAnalyticsErrorResult {}

export function makeDetectLanguageResult(
  id: string,
  detectedLanguages: DetectedLanguage[],
  statistics?: TextDocumentStatistics
): DetectLanguageSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    detectedLanguages,
    primaryLanguage: primaryLanguage(detectedLanguages)
  };
}

export function makeDetectLanguageErrorResult(
  id: string,
  error: TextAnalyticsError
): DetectLanguageErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}

function primaryLanguage(languages: DetectedLanguage[]): DetectedLanguage {
  const sorted = languages.slice(0).sort((a, b) => {
    if (a.score === undefined) {
      return -1;
    } else if (b.score === undefined) {
      return 1;
    } else {
      return a.score - b.score;
    }
  });
  return sorted[0];
}
