// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  EntitiesResult,
  TextDocumentBatchStatistics,
  TextDocumentInput,
} from "./generated/models/index.js";
import type { RecognizeCategorizedEntitiesResult } from "./recognizeCategorizedEntitiesResult.js";
import {
  makeRecognizeCategorizedEntitiesErrorResult,
  makeRecognizeCategorizedEntitiesResult,
} from "./recognizeCategorizedEntitiesResult.js";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult.js";

/**
 * Array of `RecognizeCategorizedEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizeCategorizedEntitiesResultArray extends Array<RecognizeCategorizedEntitiesResult> {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}

/**
 * @internal
 */
export function makeRecognizeCategorizedEntitiesResultArray(
  input: TextDocumentInput[],
  response: EntitiesResult,
): RecognizeCategorizedEntitiesResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeRecognizeCategorizedEntitiesResult,
    makeRecognizeCategorizedEntitiesErrorResult,
  );
}
