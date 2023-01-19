// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  AnalyzeResult,
  AnalyzedDocument,
  DocumentAnalysisPollOperationState,
} from "../lro/analysis";
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

  /**
   * A  list of additional fields to add to the extracted documents.
   *
   * Additional fields are calculated using a GPT model and do not require any training.
   */
  additionalFields?: string[];

  /**
   * A list of features to enable in the model. Enabling features may incur additional costs, so be sure to consult the
   * service documentation to understand the nature of the features and any added costs associated with using them.
   *
   * TODO: documentation link, do we need a stronger type?
   */
  features?: string[];
}
