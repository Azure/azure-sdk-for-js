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
 * The result of the classify custom single class operation on a single document.
 */
export type ClassifyCustomSingleClassResult =
  | ClassifyCustomSingleClassSuccessResult
  | ClassifyCustomSingleClassErrorResult;

/**
 * The result of the classify custom single class operation on a single document,
 * containing the result of the classification.
 */
export interface ClassifyCustomSingleClassSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The classification result of the input document.
   */
  classification: CustomClassification;
}

/**
 * A classification result from a classify custom single class action
 */
export interface CustomClassification extends ClassificationResult {}

/**
 * An error result from the classify custom single class operation on a single document.
 */
export type ClassifyCustomSingleClassErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeClassifyCustomSingleClassResult(
  result: SingleClassificationDocument
): ClassifyCustomSingleClassSuccessResult {
  const { id, warnings, statistics, classification } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classification
  };
}

/**
 * @internal
 */
export function makeClassifyCustomSingleClassErrorResult(
  id: string,
  error: TextAnalyticsError
): ClassifyCustomSingleClassErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
