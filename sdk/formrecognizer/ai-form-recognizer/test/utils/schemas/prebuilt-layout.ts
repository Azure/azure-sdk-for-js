// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-layout
// Description: Extract text and layout information from documents.
// API Version: 2022-08-31
// Created:     Thu Aug 25 2022

import * as fr from "../../../src";

/**
 * Extract text and layout information from documents.
 */
export const PrebuiltLayoutModel = fr.createModelFromSchema(
  modelInfo()
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
    createdOn: "2022-08-31T00:00:00.000Z",
    apiVersion: "2022-08-31",
  } as const;
}
