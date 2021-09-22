// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import {
  TextAnalyticsError,
  ClassificationResult,
  SingleClassificationDocument
} from "./generated/models";

/**
 * The result of the custom classify document single category operation on a single document.
 */
export type ClassifyDocumentSingleCategoryResult =
  | ClassifyDocumentSingleCategorySuccessResult
  | ClassifyDocumentSingleCategoryErrorResult;

/**
 * The result of the custom classify document single category operation on a single document,
 * containing the result of the classification.
 */
export interface ClassifyDocumentSingleCategorySuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The classification result of the input document.
   */
  classification: DocumentClassification;
}

/**
 * A classification result from a custom classify document single category action
 */
export interface DocumentClassification extends ClassificationResult {}

/**
 * An error result from the custom classify document single category operation on a single document.
 */
export type ClassifyDocumentSingleCategoryErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeClassifyDocumentSingleCategoryResult(
  result: SingleClassificationDocument
): ClassifyDocumentSingleCategorySuccessResult {
  const { id, warnings, statistics, classification } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classification
  };
}

/**
 * @internal
 */
export function makeClassifyDocumentSingleCategoryErrorResult(
  id: string,
  error: TextAnalyticsError
): ClassifyDocumentSingleCategoryErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
