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
export type CustomClassifyDocumentSingleCategoryResult =
  | CustomClassifyDocumentSingleCategorySuccessResult
  | CustomClassifyDocumentSingleCategoryErrorResult;

/**
 * The result of the custom classify document single category operation on a single document,
 * containing the result of the classification.
 */
export interface CustomClassifyDocumentSingleCategorySuccessResult
  extends TextAnalyticsSuccessResult {
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
export type CustomClassifyDocumentSingleCategoryErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeCustomClassifyDocumentSingleCategoryResult(
  result: SingleClassificationDocument
): CustomClassifyDocumentSingleCategorySuccessResult {
  const { id, warnings, statistics, classification } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classification
  };
}

/**
 * @internal
 */
export function makeCustomClassifyDocumentSingleCategoryErrorResult(
  id: string,
  error: TextAnalyticsError
): CustomClassifyDocumentSingleCategoryErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
