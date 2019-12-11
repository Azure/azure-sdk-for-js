// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentStatistics, TextAnalyticsError } from "./generated/models";

export type TextAnalyticsResult = TextAnalyticsSuccessResult | TextAnalyticsErrorResult;

export interface TextAnalyticsSuccessResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the document payload.
   */
  readonly statistics?: DocumentStatistics;
}

export interface TextAnalyticsErrorResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * The Error for this document result.
   */
  readonly error: TextAnalyticsError;
}

export function makeTextAnalysisResult(
  id: string,
  statistics?: DocumentStatistics
): TextAnalyticsResult {
  return {
    id,
    statistics
  };
}

export function makeTextAnalysisErrorResult(
  id: string,
  error: TextAnalyticsError
): TextAnalyticsErrorResult {
  return {
    id,
    error
  };
}
