// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { DocumentStatistics, ErrorModel, LinkedEntity } from "./generated/models";

export type ExtractLinkedEntitiesResult =
  | ExtractLinkedEntitiesSuccessResult
  | ExtractLinkedEntitiesErrorResult;

export interface ExtractLinkedEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Recognized entities in the document.
   */
  readonly entities: LinkedEntity[];
}

export interface ExtractLinkedEntitiesErrorResult extends TextAnalyticsErrorResult {}

export function makeExtractLinkedEntitiesResult(
  id: string,
  entities: LinkedEntity[],
  statistics?: DocumentStatistics
): ExtractLinkedEntitiesSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    entities
  };
}

export function makeExtractLinkedEntitiesErrorResult(
  id: string,
  error: ErrorModel
): ExtractLinkedEntitiesErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
