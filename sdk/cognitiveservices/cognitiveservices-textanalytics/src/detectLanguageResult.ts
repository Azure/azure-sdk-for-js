// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalysisResult, makeTextAnalysisResult } from "./textAnalysisResult";
import { DetectedLanguage, DocumentStatistics } from "./generated/models";

export interface DetectLanguageResult extends TextAnalysisResult {
  /**
   * All detected languages.
   */
  readonly detectedLanguages: DetectedLanguage[];
  /**
   * The top language by confidence score.
   */
  readonly primaryLanguage: DetectedLanguage | undefined;
}

export function makeDetectLanguageResult(
  id: string,
  detectedLanguages: DetectedLanguage[],
  statistics?: DocumentStatistics
): DetectLanguageResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    detectedLanguages,
    primaryLanguage: primaryLanguage(detectedLanguages)
  };
}

function primaryLanguage(languages: DetectedLanguage[]): DetectedLanguage | undefined {
  if (languages.length === 0) {
    return undefined;
  }

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
