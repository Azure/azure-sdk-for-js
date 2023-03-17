// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-document
// Description: Extract text, layout, entities, and general key-value pairs from documents.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract text, layout, entities, and general key-value pairs from documents.
 */
export const PrebuiltDocumentModel = fr.createModelFromSchema(
  modelInfo()
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
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-document",
    description: "Extract text, layout, entities, and general key-value pairs from documents.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
  } as const;
}
