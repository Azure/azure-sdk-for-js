// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult,
} from "./textAnalyticsResult";
import {
  TextAnalyticsError,
  ClassificationResult,
  SingleClassificationDocument,
} from "./generated/models";

/**
 * The result of the custom classify document single category operation on a single document.
 */
export type SingleCategoryClassifyResult =
  | SingleCategoryClassifySuccessResult
  | SingleCategoryClassifyErrorResult;

/**
 * The result of the custom classify document single category operation on a single document,
 * containing the result of the classification.
 */
export interface SingleCategoryClassifySuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The classification result of the input document.
   */
  classification: ClassificationCategory;
}

/**
 * A classification result from a custom classify document single category action
 */
export interface ClassificationCategory extends ClassificationResult {}

/**
 * An error result from the custom classify document single category operation on a single document.
 */
export type SingleCategoryClassifyErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeSingleCategoryClassifyResult(
  result: SingleClassificationDocument
): SingleCategoryClassifySuccessResult {
  const { id, warnings, statistics, classification } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classification,
  };
}

/**
 * @internal
 */
export function makeSingleCategoryClassifyErrorResult(
  id: string,
  error: TextAnalyticsError
): SingleCategoryClassifyErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
