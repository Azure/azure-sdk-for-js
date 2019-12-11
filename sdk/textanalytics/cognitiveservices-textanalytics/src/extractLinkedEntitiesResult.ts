// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalyticsResult";
import { TextDocumentStatistics, TextAnalyticsError, LinkedEntity } from "./generated/models";

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
  statistics?: TextDocumentStatistics
): ExtractLinkedEntitiesSuccessResult {
  return {
    ...makeTextAnalysisResult(id, statistics),
    entities
  };
}

export function makeExtractLinkedEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): ExtractLinkedEntitiesErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
