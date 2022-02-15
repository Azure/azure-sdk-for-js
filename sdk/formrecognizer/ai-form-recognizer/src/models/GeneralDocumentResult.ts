// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentEntity, DocumentKeyValuePair } from "../generated";
import { AnalyzeResult } from "../lro/analyze";
import { LayoutResult, toLayoutResult } from "./LayoutResult";

/**
 * Extract from an AnalyzeResult the fields that are produced from General Document extraction (`"prebuilt-document"`).
 *
 * @internal
 */
export function toGeneralDocumentResult(
  analyzeResult: AnalyzeResult<unknown>
): GeneralDocumentResult {
  const { keyValuePairs, entities } = analyzeResult;
  return {
    ...toLayoutResult(analyzeResult),
    keyValuePairs,
    entities,
  };
}

/**
 * The result of analysis using the prebuilt General Document model (`"prebuilt-document"`).
 *
 * This model produces all of the fields of the layout model (pages, tables, and styles) as well as extracted key-value
 * pairs and entities.
 */
export interface GeneralDocumentResult extends LayoutResult {
  /**
   * Extracted key-value pairs. A key-value pair is a directed association between two page elements.
   *
   * For example, a labeled entry box may consist of the label (key) and the entry box text (value).
   */
  keyValuePairs: DocumentKeyValuePair[];
  /**
   * Extracted entities. An entity is a page element that has been classified as belonging to a category and optionally
   * a subcategory.
   *
   * For example, the text "CALIFORNIA" may be identified as an entity with the category "Location".
   */
  entities: DocumentEntity[];
}
