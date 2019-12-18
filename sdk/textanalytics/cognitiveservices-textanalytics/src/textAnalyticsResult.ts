// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextDocumentStatistics, TextAnalyticsError } from "./generated/models";

/**
 * The result of a text analytics operation on a single input document.
 */
export type TextAnalyticsResult = TextAnalyticsSuccessResult | TextAnalyticsErrorResult;

/**
 * Base type for results of text analytics operations corresponding to a single
 * input document.
 */
export interface TextAnalyticsSuccessResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * Statistics about the input document and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  readonly statistics?: TextDocumentStatistics;
}

/**
 * Base type for error results of text analytics operations corresponding to a
 * single document.
 */
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
  statistics?: TextDocumentStatistics
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
