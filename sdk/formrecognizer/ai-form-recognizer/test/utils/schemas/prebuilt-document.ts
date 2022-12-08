// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-document
// Description: Extract text, layout, entities, and general key-value pairs from documents.
// API Version: 2022-08-31
// Created:     Thu Aug 25 2022

import * as fr from "../../../src";

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
    createdOn: "2022-08-31T00:00:00.000Z",
    apiVersion: "2022-08-31",
  } as const;
}
