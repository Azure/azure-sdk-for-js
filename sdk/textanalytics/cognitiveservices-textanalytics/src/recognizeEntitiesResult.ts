// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { Entity, TextDocumentStatistics, TextAnalyticsError } from "./generated/models";

/**
 * The result of the recognize entities operation on a single document.
 */
export type RecognizeEntitiesResult = RecognizeEntitiesSuccessResult | RecognizeEntitiesErrorResult;

/**
 * The result of the recognize entities operation on a single document, containing the collection of
 * `Entity` objects identified in that document.
 */
export interface RecognizeEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Gets the collection of entities identified in the input document.
   */
  readonly entities: Entity[];
}

/**
 * An error result from the recognize entities operation on a single document.
 */
export interface RecognizeEntitiesErrorResult extends TextAnalyticsErrorResult {}

export function makeRecognizeEntitiesResult(
  id: string,
  entities: Entity[],
  statistics?: TextDocumentStatistics
): RecognizeEntitiesSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    entities
  };
}

export function makeRecognizeEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeEntitiesErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
