// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  EntityLinkingResult,
} from "./generated/models";
import {
  RecognizeLinkedEntitiesResult,
  makeRecognizeLinkedEntitiesResult,
  makeRecognizeLinkedEntitiesErrorResult,
} from "./recognizeLinkedEntitiesResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult";

/**
 * Array of `RecognizeLinkedEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizeLinkedEntitiesResultArray extends Array<RecognizeLinkedEntitiesResult> {
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
export function makeRecognizeLinkedEntitiesResultArray(
  input: TextDocumentInput[],
  response: EntityLinkingResult
): RecognizeLinkedEntitiesResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeRecognizeLinkedEntitiesResult,
    makeRecognizeLinkedEntitiesErrorResult
  );
}
