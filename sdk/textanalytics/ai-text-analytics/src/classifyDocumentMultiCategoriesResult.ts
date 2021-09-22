// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import { TextAnalyticsError, MultiClassificationDocument } from "./generated/models";
import { DocumentClassification } from "./classifyDocumentSingleCategoryResult";

/**
 * The result of the custom classify document multi categories operation on a multi document.
 */
export type ClassifyDocumentMultiCategoriesResult =
  | ClassifyDocumentMultiCategoriesSuccessResult
  | ClassifyDocumentMultiCategoriesErrorResult;

/**
 * The result of the custom classify document multi categories operation on a multi document,
 * containing the result of the classification.
 */
export interface ClassifyDocumentMultiCategoriesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  classifications: DocumentClassification[];
}

/**
 * An error result from the custom classify document multi categories operation on a multi document.
 */
export type ClassifyDocumentMultiCategoriesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeClassifyDocumentMultiCategoriesResult(
  result: MultiClassificationDocument
): ClassifyDocumentMultiCategoriesSuccessResult {
  const { id, warnings, statistics, classifications } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    classifications
  };
}

/**
 * @internal
 */
export function makeClassifyDocumentMultiCategoriesErrorResult(
  id: string,
  error: TextAnalyticsError
): ClassifyDocumentMultiCategoriesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
