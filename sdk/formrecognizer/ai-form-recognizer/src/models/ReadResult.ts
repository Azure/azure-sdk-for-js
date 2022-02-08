// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentLanguage } from "../generated";
import {
  AnalyzeResult,
  AnalyzeResultCommon,
  DocumentPage,
  toDocumentPageFromGenerated,
} from "../lro/analyze";

/**
 * Extract from an AnalyzeResult the fields that are produced from document reading.
 * @internal
 */
export function toReadResult(analyzeResult: AnalyzeResult<unknown>): ReadResult {
  const { apiVersion, modelId, content, pages, languages } = analyzeResult;

  return {
    apiVersion,
    modelId,
    content,
    pages: pages.map(toDocumentPageFromGenerated),
    languages,
  };
}

/**
 * The result of analysis using the prebuilt "read" model ("prebuilt-read").
 *
 * This model produces only textual information: pages and languages.
 */
export interface ReadResult extends AnalyzeResultCommon {
  /**
   * Pages extracted from the input document.
   */
  pages: DocumentPage[];

  /**
   * Extracted text languages.
   */
  languages: DocumentLanguage[];
}
