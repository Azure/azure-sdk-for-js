// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { TextDocumentStatistics, TextAnalyticsError, LinkedEntity } from "./generated/models";

export type RecognizeLinkedEntitiesResult =
  | RecognizeLinkedEntitiesSuccessResult
  | RecognizeLinkedEntitiesErrorResult;

export interface RecognizeLinkedEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Recognized entities in the document.
   */
  readonly entities: LinkedEntity[];
}

export interface RecognizeLinkedEntitiesErrorResult extends TextAnalyticsErrorResult {}

export function makeRecognizeLinkedEntitiesResult(
  id: string,
  entities: LinkedEntity[],
  statistics?: TextDocumentStatistics
): RecognizeLinkedEntitiesSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    entities
  };
}

export function makeRecognizeLinkedEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): RecognizeLinkedEntitiesErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
