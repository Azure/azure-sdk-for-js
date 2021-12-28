// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  SentimentResponse,
} from "./generated/models";
import {
  AnalyzeSentimentResult,
  makeAnalyzeSentimentErrorResult,
  makeAnalyzeSentimentResult,
} from "./analyzeSentimentResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult";

/**
 * Array of `AnalyzeSentimentResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface AnalyzeSentimentResultArray extends Array<AnalyzeSentimentResult> {
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
export function makeAnalyzeSentimentResultArray(
  input: TextDocumentInput[],
  response: SentimentResponse
): AnalyzeSentimentResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeAnalyzeSentimentResult,
    makeAnalyzeSentimentErrorResult
  );
}
