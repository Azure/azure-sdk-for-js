// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MultiClassificationDocument, TextAnalyticsError } from "./generated/models";
import { TextAnalyticsErrorResult, TextAnalyticsSuccessResult, makeTextAnalyticsErrorResult, makeTextAnalyticsSuccessResult } from "./textAnalyticsResult";
import { ClassificationCategory } from "./singleCategoryClassifyResult";

/**
 * The result of the custom classify document multi categories operation on a multi document.
 */
export type MultiCategoryClassifyResult =
  | MultiCategoryClassifySuccessResult
  | MultiCategoryClassifyErrorResult;

/**
 * The result of the custom classify document multi categories operation on a multi document,
 * containing the result of the classification.
 */
export interface MultiCategoryClassifySuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  classifications: ClassificationCategory[];
}

/**
 * An error result from the custom classify document multi category operation on a multi document.
 */
export type MultiCategoryClassifyErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeMultiCategoryClassifyResult(
  result: MultiClassificationDocument
): MultiCategoryClassifySuccessResult {
  const { id, warnings, statistics, classifications } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classifications
  };
}

/**
 * @internal
 */
export function makeMultiCategoryClassifyErrorResult(
  id: string,
  error: TextAnalyticsError
): MultiCategoryClassifyErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
