// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-read
// Description: Extract text from documents.
// API Version: 2022-08-31
// Created:     Thu Aug 25 2022

import * as fr from "../../../src";

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
    createdOn: "2022-08-31T00:00:00.000Z",
    apiVersion: "2022-08-31",
  } as const;
}
