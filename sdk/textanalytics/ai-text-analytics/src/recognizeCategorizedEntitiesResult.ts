// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult,
} from "./textAnalyticsResult";
import { Entity, TextAnalyticsError, DocumentEntities } from "./generated/models";

/**
 * An entity from text analysis with information about its categorical
 * classification.
 */
export interface CategorizedEntity extends Entity {}

/**
 * The result of the recognize entities operation on a single document.
 */
export type RecognizeCategorizedEntitiesResult =
  | RecognizeCategorizedEntitiesSuccessResult
  | RecognizeCategorizedEntitiesErrorResult;

/**
 * The result of the recognize entities operation on a single document, containing the collection of
 * `Entity` objects identified in that document.
 */
export interface RecognizeCategorizedEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: CategorizedEntity[];
}

/**
 * An error result from the recognize entities operation on a single document.
 */
export type RecognizeCategorizedEntitiesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeRecognizeCategorizedEntitiesResult(
  result: DocumentEntities
): RecognizeCategorizedEntitiesSuccessResult {
  const { entities, statistics, warnings, id } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities,
  };
}

/**
 * @internal
 */
export function makeRecognizeCategorizedEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeCategorizedEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
