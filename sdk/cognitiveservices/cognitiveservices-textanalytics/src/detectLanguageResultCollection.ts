// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestStatistics, LanguageBatchResultItem } from "./generated/models";
import { DetectLanguageResult, makeDetectLanguageResult } from "./detectLanguageResult";

export interface DetectLanguageResultCollection extends Array<DetectLanguageResult> {
  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the request payload.
   */
  statistics?: RequestStatistics;
}

export function makeDetectLanguageResultCollection(
  batchResults: LanguageBatchResultItem[],
  statistics?: RequestStatistics
): DetectLanguageResultCollection {
  const result: DetectLanguageResultCollection = batchResults.map(
    (batchResult): DetectLanguageResult => {
      return makeDetectLanguageResult(
        batchResult.id || "",
        batchResult.detectedLanguages || [],
        batchResult.statistics
      );
    }
  );
  result.statistics = statistics;
  return result;
}
