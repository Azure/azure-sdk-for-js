// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-document
// Description: Extract text, layout, entities, and general key-value pairs from documents.
// API Version: 2023-07-31
// Created:     Thu Apr 06 2023

import * as fr from "../../../src";

/**
 * Extract text, layout, entities, and general key-value pairs from documents.
 */
export const PrebuiltDocumentModel = fr.createModelFromSchema(
  modelInfo(),
) as fr.DocumentModel<PrebuiltDocumentResult>;

export interface PrebuiltDocumentResult extends fr.AnalyzeResultCommon {
  /**
   * Extracted pages.
   */
  pages?: fr.DocumentPage[];
  /**
   * Extracted document paragraphs.
   */
  paragraphs?: fr.DocumentParagraph[];
  /**
   * Extracted font styles.
   */
  styles?: fr.DocumentStyle[];
  /**
   * Extracted tables.
   */
  tables?: fr.DocumentTable[];
  /**
   * Extracted key-value pairs.
   */
  keyValuePairs?: fr.DocumentKeyValuePair[];
  /**
   * Extracted documents containing any extracted fields.
   */
  documents?: fr.AnalyzedDocument[];
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-document",
    description: "Extract text, layout, entities, and general key-value pairs from documents.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-07-31",
  } as const;
}
