// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { Entity, DocumentStatistics, TextAnalyticsError } from "./generated/models";

export type RecognizeEntitiesResult = RecognizeEntitiesSuccessResult | RecognizeEntitiesErrorResult;

export interface RecognizeEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Recognized entities in the document.
   */
  readonly entities: Entity[];
}

export interface RecognizeEntitiesErrorResult extends TextAnalyticsErrorResult {}

export function makeRecognizeEntitiesResult(
  id: string,
  entities: Entity[],
  statistics?: DocumentStatistics
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
