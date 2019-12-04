// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentStatistics, ErrorModel } from "./generated/models";

export type TextAnalysisResult = TextAnalysisSuccessResult | TextAnalysisErrorResult;

export interface TextAnalysisSuccessResult {
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

export interface TextAnalysisErrorResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * The Error for this document result.
   */
  readonly error: ErrorModel;
}

export function makeTextAnalysisResult(
  id: string,
  statistics?: DocumentStatistics
): TextAnalysisResult {
  return {
    id,
    statistics
  };
}

export function makeTextAnalysisErrorResult(
  id: string,
  error: ErrorModel
): TextAnalysisErrorResult {
  return {
    id,
    error
  };
}
