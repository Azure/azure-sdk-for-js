// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import { TextAnalyticsError, DocumentEntities } from "./generated/models";
import { CategorizedEntity } from "./recognizeCategorizedEntitiesResult";

/**
 * The result of the custom recognize entities operation on a single document.
 */
export type CustomRecognizeEntitiesResult =
  | CustomRecognizeEntitiesSuccessResult
  | CustomRecognizeEntitiesErrorResult;

/**
 * The result of the recognize custom entities operation on a single document,
 * containing a collection of the entities identified in that document.
 */
export interface CustomRecognizeEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  entities: CategorizedEntity[];
}

/**
 * An error result from the recognize custom entities operation on a single document.
 */
export type CustomRecognizeEntitiesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeCustomRecognizeEntitiesResult(
  result: DocumentEntities
): CustomRecognizeEntitiesSuccessResult {
  const { id, warnings, statistics, entities } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities
  };
}

/**
 * @internal
 */
export function makeCustomRecognizeEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): CustomRecognizeEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
