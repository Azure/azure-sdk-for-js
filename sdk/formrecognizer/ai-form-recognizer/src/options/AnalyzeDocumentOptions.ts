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
 * Add-on capabilities (features) that can be enabled for the request.
 *
 * For more information about the features available in Form Recognizer, see the service documentation:
 *
 * https://aka.ms/azsdk/formrecognizer/features
 */
export type FormRecognizerFeature =
  | (typeof FormRecognizerFeature)[keyof typeof FormRecognizerFeature]
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FormRecognizerFeature = {
  /**
   * Enables the use of Query Fields.
   */
  QueryFieldsPremium: "queryFields.premium",

  /**
   * Enables extracting extra font information.
   */
  OcrFont: "ocr.font",

  /**
   * Enables high-resolution processing for documents with small text.
   */
  OcrHighResolution: "ocr.highResolution",

  /**
   * Enables formula extraction.
   */
  OcrFormula: "ocr.formula",
} as const;

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
   * A list of additional fields to add to the extracted documents.
   *
   * Additional fields are extracted dynamically and do not require any training. This capability is only available if
   * the "queryFields.premium" feature is enabled. Pass "queryFields.premium" in the `features` parameter
   * to enable it.
   *
   * NOTE: This feature incurs additional costs, so be sure to consult the service documentation to understand the added
   * costs associated with using it. See the service documentation for more information: https://aka.ms/azsdk/formrecognizer/queryfields
   */
  queryFields?: string[];

  /**
   * A list of features to enable in the model. Enabling features may incur additional costs, so be sure to consult the
   * service documentation to understand the nature of the features and any added costs associated with using them.
   *
   * For more information about the features available in Form Recognizer, see the service documentation: https://aka.ms/azsdk/formrecognizer/features
   */
  features?: string[];
}
