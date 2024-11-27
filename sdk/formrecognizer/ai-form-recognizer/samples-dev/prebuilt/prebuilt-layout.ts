// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @azsdk-util
 * @azsdk-skip-javascript
 */

// Model:       prebuilt-layout
// Description: Extract text and layout information from documents.
// API Version: 2023-07-31
// Created:     Thu Apr 06 2023

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract text and layout information from documents.
 */
export const PrebuiltLayoutModel = fr.createModelFromSchema(
  modelInfo(),
) as fr.DocumentModel<PrebuiltLayoutResult>;

export interface PrebuiltLayoutResult extends fr.AnalyzeResultCommon {
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
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-layout",
    description: "Extract text and layout information from documents.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-07-31",
  } as const;
}
