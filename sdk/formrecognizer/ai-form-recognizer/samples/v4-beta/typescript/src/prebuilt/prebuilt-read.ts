// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-read
// Description: Extract text from documents.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract text from documents.
 */
export const PrebuiltReadModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltReadResult>;

export interface PrebuiltReadResult extends fr.AnalyzeResultCommon {
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
   * Extracted text languages.
   */
  languages?: fr.DocumentLanguage[];
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-read",
    description: "Extract text from documents.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
  } as const;
}
