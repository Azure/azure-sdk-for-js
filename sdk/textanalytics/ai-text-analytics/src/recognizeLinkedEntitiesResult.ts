// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult,
} from "./textAnalyticsResult";
import { TextAnalyticsError, LinkedEntity, DocumentLinkedEntities } from "./generated/models";

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
export type RecognizeLinkedEntitiesErrorResult = TextAnalyticsErrorResult;

/**
 * @internal
 */
export function makeRecognizeLinkedEntitiesResult(
  result: DocumentLinkedEntities
): RecognizeLinkedEntitiesSuccessResult {
  const { statistics, id, warnings, entities } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities,
  };
}

/**
 * @internal
 */
export function makeRecognizeLinkedEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeLinkedEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
