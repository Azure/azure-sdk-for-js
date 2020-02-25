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
 * An entity from PII recognition with information about the kind of PII
 * encountered.
 */
export interface PiiEntity extends Entity {}

/**
 * The result of the recognize entities operation on a single document.
 */
export type RecognizePiiEntitiesResult =
  | RecognizePiiEntitiesSuccessResult
  | RecognizePiiEntitiesErrorResult;

/**
 * The result of the recognize entities operation on a single document, containing the collection of
 * `Entity` objects identified in that document.
 */
export interface RecognizePiiEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: PiiEntity[];
}

/**
 * An error result from the recognize entities operation on a single document.
 */
export type RecognizePiiEntitiesErrorResult = TextAnalyticsErrorResult;

export function makeRecognizePiiEntitiesResult(
  id: string,
  entities: PiiEntity[],
  statistics?: TextDocumentStatistics
): RecognizePiiEntitiesSuccessResult {
  return {
    ...makeTextAnalyticsSuccessResult(id, statistics),
    entities
  };
}

export function makeRecognizePiiEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizePiiEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
