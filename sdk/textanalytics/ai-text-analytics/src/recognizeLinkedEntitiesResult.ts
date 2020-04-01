// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import { TextDocumentStatistics, TextAnalyticsError, LinkedEntity } from "./generated/models";

/**
 * The result of the recognize linked entities operation on a single document.
 */
export type RecognizeLinkedEntitiesResult =
  | RecognizeLinkedEntitiesSuccessResult
  | RecognizeLinkedEntitiesErrorResult;

/**
 * The result of the recognize linked entities operation on a single document,
 * containing a collection of the `LinkedEntity` objects identified in that document.
 */
export interface RecognizeLinkedEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: LinkedEntity[];
}

/**
 * An error result from the recognize linked entities operation on a single document.
 */
export type RecognizeLinkedEntitiesErrorResult = TextAnalyticsErrorResult

export function makeRecognizeLinkedEntitiesResult(
  id: string,
  entities: LinkedEntity[],
  statistics?: TextDocumentStatistics
): RecognizeLinkedEntitiesSuccessResult {
  return {
    ...makeTextAnalyticsSuccessResult(id, statistics),
    entities
  };
}

export function makeRecognizeLinkedEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeLinkedEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
