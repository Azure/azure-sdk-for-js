// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextDocumentBatchStatistics, LanguageResult, TextDocumentInput } from "./generated/models";
import {
  DetectLanguageResult,
  makeDetectLanguageResult,
  makeDetectLanguageErrorResult,
} from "./detectLanguageResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult";

/**
 * Array of `DetectLanguageResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface DetectLanguageResultArray extends Array<DetectLanguageResult> {
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
export function makeDetectLanguageResultArray(
  input: TextDocumentInput[],
  response: LanguageResult
): DetectLanguageResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeDetectLanguageResult,
    makeDetectLanguageErrorResult
  );
}
