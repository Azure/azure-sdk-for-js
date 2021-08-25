// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import { TextAnalyticsError, MultiClassificationDocument } from "./generated/models";
import { CustomClassification } from "./classifyCustomSingleClassResult";

/**
 * The result of the classify custom multi class operation on a multi document.
 */
export type ClassifyCustomMultiClassResult =
  | ClassifyCustomMultiClassSuccessResult
  | ClassifyCustomMultiClassErrorResult;

/**
 * The result of the classify custom multi class operation on a multi document,
 * containing the result of the classification.
 */
export interface ClassifyCustomMultiClassSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  classifications: CustomClassification[];
}

/**
 * An error result from the classify custom multi class operation on a multi document.
 */
export type ClassifyCustomMultiClassErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeClassifyCustomMultiClassResult(
  result: MultiClassificationDocument
): ClassifyCustomMultiClassSuccessResult {
  const { id, warnings, statistics, classifications } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classifications
  };
}

/**
 * @internal
 */
export function makeClassifyCustomMultiClassErrorResult(
  id: string,
  error: TextAnalyticsError
): ClassifyCustomMultiClassErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
