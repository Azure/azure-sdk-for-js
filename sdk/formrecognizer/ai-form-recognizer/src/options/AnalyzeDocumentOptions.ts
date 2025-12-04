// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type {
  AnalyzeResult,
  AnalyzedDocument,
  DocumentAnalysisPollOperationState,
} from "../lro/analysis.js";
import type { PollerOptions } from "./PollerOptions.js";

/**
 * Add-on capabilities (features) that can be enabled for the request.
 *
 * For more information about the features available in Form Recognizer, see the service documentation:
 *
 * https://aka.ms/azsdk/formrecognizer/features
 */
export type FormRecognizerFeature =
  | (typeof FormRecognizerFeature)[keyof typeof FormRecognizerFeature]
  | (string & {});

/**
 * Known feature flags supported by the Form Recognizer clients.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FormRecognizerFeature = {
  /**
   * Enables extracting extra font information.
   */
  Fonts: "styleFont",

  /**
   * Enables high-resolution processing for documents with small text.
   */
  OcrHighResolution: "ocrHighResolution",

  /**
   * Enables the detection of mathematical expressions in the document..
   */
  Formulas: "formulas",

  /**
   * Enables the detection of the text content language.
   */
  Languages: "languages",

  /**
   *  Enables the detection of barcodes in the document.
   */
  Barcodes: "barcodes",

  /**
   *  Enables the detection of general key value pairs (form fields) in the document.
   */
  KeyValuePairs: "keyValuePairs",
} as const;

/**
 * Options for the document analysis operation.
 */
export interface AnalyzeDocumentOptions<Result = AnalyzeResult<AnalyzedDocument>>
  extends OperationOptions, PollerOptions<DocumentAnalysisPollOperationState<Result>> {
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
   * A list of features to enable in the model. Enabling features may incur additional costs, so be sure to consult the
   * service documentation to understand the nature of the features and any added costs associated with using them.
   *
   * For more information about the features available in Form Recognizer, see the service documentation: https://aka.ms/azsdk/formrecognizer/features
   */
  features?: FormRecognizerFeature[];
}
