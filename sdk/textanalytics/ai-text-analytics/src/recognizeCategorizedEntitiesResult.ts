// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import { Entity, TextDocumentStatistics, TextAnalyticsError } from "./generated/models";

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

export function makeRecognizeCategorizedEntitiesResult(
  id: string,
  entities: CategorizedEntity[],
  statistics?: TextDocumentStatistics
): RecognizeCategorizedEntitiesSuccessResult {
  return {
    ...makeTextAnalyticsSuccessResult(id, statistics),
    entities
  };
}

export function makeRecognizeCategorizedEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeCategorizedEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
