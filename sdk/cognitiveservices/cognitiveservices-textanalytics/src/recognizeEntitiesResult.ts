// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalysisResult,
  TextAnalysisSuccessResult,
  TextAnalysisErrorResult,
  makeTextAnalysisErrorResult
} from "./textAnalysisResult";
import { Entity, DocumentStatistics, ErrorModel } from "./generated/models";

export type RecognizeEntitiesResult = RecognizeEntitiesSuccessResult | RecognizeEntitiesErrorResult;

export interface RecognizeEntitiesSuccessResult extends TextAnalysisSuccessResult {
  /**
   * Recognized entities in the document.
   */
  readonly entities: Entity[];
}

export interface RecognizeEntitiesErrorResult extends TextAnalysisErrorResult {}

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
  error: ErrorModel
): RecognizeEntitiesErrorResult {
  return makeTextAnalysisErrorResult(id, error);
}
