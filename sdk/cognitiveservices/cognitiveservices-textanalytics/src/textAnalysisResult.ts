// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentStatistics } from "./generated/models";

export interface TextAnalysisResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the document payload.
   */
  readonly statistics?: DocumentStatistics;

  /**
   * The error message for this document result, if any.
   */
  readonly errorMessage?: string;
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

export function makeTextAnalysisResultError(id: string, errorMessage: string): TextAnalysisResult {
  return {
    id,
    errorMessage
  };
}
