// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentLanguage, DocumentStyle } from "../generated";
import { AnalyzeResult, AnalyzeResultCommon } from "../lro/analyze";
import { DocumentPage } from "./documentElements";

/**
 * Extract from an AnalyzeResult the fields that are produced from document reading.
 * @internal
 */
export function toReadResult(analyzeResult: AnalyzeResult<unknown>): ReadResult {
  const { apiVersion, modelId, content, pages, languages, styles } = analyzeResult;

  return {
    apiVersion,
    modelId,
    content,
    pages,
    languages,
    styles,
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

  /**
   * The text styles that were observed in the input.
   *
   * For example, this contains information about regions of the input where handwritten text occurs.
   */
  styles: DocumentStyle[];
}
