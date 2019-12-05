// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalysisSuccessResult,
  TextAnalysisErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalysisResult";
import { DocumentStatistics, ErrorModel, LinkedEntity } from "./generated/models";

export type ExtractLinkedEntitiesResult =
  | ExtractLinkedEntitiesSuccessResult
  | ExtractLinkedEntitiesErrorResult;

export interface ExtractLinkedEntitiesSuccessResult extends TextAnalysisSuccessResult {
  /**
   * Recognized entities in the document.
   */
  readonly entities: LinkedEntity[];
}

export interface ExtractLinkedEntitiesErrorResult extends TextAnalysisErrorResult {}

export function makeExtractLinkedEntitiesResult(
  id: string,
  entities: LinkedEntity[],
  statistics?: DocumentStatistics
): ExtractLinkedEntitiesResult {
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
