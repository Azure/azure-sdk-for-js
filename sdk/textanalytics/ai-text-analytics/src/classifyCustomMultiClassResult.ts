// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import { TextAnalyticsError, MultiClassificationDocument } from "./generated/models";
import { DocumentClassification } from "./classifyCustomSingleClassResult";

/**
 * The result of the custom classify document multi categories operation on a multi document.
 */
export type CustomClassifyDocumentMultiCategoriesResult =
  | CustomClassifyDocumentMultiCategoriesSuccessResult
  | CustomClassifyDocumentMultiCategoriesErrorResult;

/**
 * The result of the custom classify document multi categories operation on a multi document,
 * containing the result of the classification.
 */
export interface CustomClassifyDocumentMultiCategoriesSuccessResult
  extends TextAnalyticsSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  classifications: DocumentClassification[];
}

/**
 * An error result from the custom classify document multi categories operation on a multi document.
 */
export type CustomClassifyDocumentMultiCategoriesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeCustomClassifyDocumentMultiCategoriesResult(
  result: MultiClassificationDocument
): CustomClassifyDocumentMultiCategoriesSuccessResult {
  const { id, warnings, statistics, classifications } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classifications
  };
}

/**
 * @internal
 */
export function makeCustomClassifyDocumentMultiCategoriesErrorResult(
  id: string,
  error: TextAnalyticsError
): CustomClassifyDocumentMultiCategoriesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
