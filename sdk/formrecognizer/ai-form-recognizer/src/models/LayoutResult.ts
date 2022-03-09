// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentStyle, DocumentTable } from "../generated";
import { AnalyzeResult, DocumentPage, toDocumentPageFromGenerated } from "../lro/analyze";

/**
 * Extract from an AnalyzeResult the fields that are produced from layout analysis.
 * @internal
 */
export function toLayoutResult(analyzeResult: AnalyzeResult<unknown>): LayoutResult {
  const { pages, tables, styles } = analyzeResult;

  return {
    pages: pages.map(toDocumentPageFromGenerated),
    tables,
    styles,
  };
}

/**
 * The result of analysis using the prebuilt layout model ("prebuilt-layout").
 *
 * This model produces only basic elements: pages, tables, and styles.
 */
export interface LayoutResult {
  pages: DocumentPage[];
  /**
   * Extracted tables, organized into cells that individually contain their extracted contents.
   */
  tables: DocumentTable[];
  /**
   * The text styles that were observed in the input.
   *
   * For example, this contains information about regions of the input where handwritten text occurs.
   */
  styles: DocumentStyle[];
}
