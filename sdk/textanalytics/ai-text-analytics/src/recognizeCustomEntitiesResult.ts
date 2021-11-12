// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentEntities, TextAnalyticsError } from "./generated/models";
import { TextAnalyticsErrorResult, TextAnalyticsSuccessResult, makeTextAnalyticsErrorResult, makeTextAnalyticsSuccessResult } from "./textAnalyticsResult";
import { CategorizedEntity } from "./recognizeCategorizedEntitiesResult";

/**
 * The result of the custom recognize entities operation on a single document.
 */
export type RecognizeCustomEntitiesResult =
  | RecognizeCustomEntitiesSuccessResult
  | RecognizeCustomEntitiesErrorResult;

/**
 * The result of the recognize custom entities operation on a single document,
 * containing a collection of the entities identified in that document.
 */
export interface RecognizeCustomEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  entities: CategorizedEntity[];
}

/**
 * An error result from the recognize custom entities operation on a single document.
 */
export type RecognizeCustomEntitiesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeRecognizeCustomEntitiesResult(
  result: DocumentEntities
): RecognizeCustomEntitiesSuccessResult {
  const { id, warnings, statistics, entities } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities
  };
}

/**
 * @internal
 */
export function makeRecognizeCustomEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeCustomEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
