// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  AnalyzeResult,
  AnalyzedDocument,
  DocumentAnalysisPollOperationState,
} from "../lro/analyze";
import { PollerOptions } from "./PollerOptions";

/**
 * Options for the document analysis operation.
 */
export interface AnalyzeDocumentOptions<Result = AnalyzeResult<AnalyzedDocument>>
  extends OperationOptions,
    PollerOptions<DocumentAnalysisPollOperationState<Result>> {
  /**
   * Locale hint for text recognition and document analysis.
   *
   * The value may specify only the two-letter language code or a BCP-47 language tag indicating both language and region.
   *
   * Examples:
   * - "en-US" (US English)
   * - "fr" (French - no region)
   */
  locale?: string;
  /**
   * A list of page ranges (1-indexed) within the input document to analyze, separated by commas
   *
   * Examples: "1", "3-5", "1,3-5"
   */
  pages?: string;
}
