// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  ExtractiveSummarizationResult,
} from "./generated/models";
import {
  ExtractSummaryResult,
  makeExtractSummaryResult,
  makeExtractSummaryErrorResult,
} from "./extractSummaryResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult";

/**
 * Array of `ExtractSummaryResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface ExtractSummaryResultArray extends Array<ExtractSummaryResult> {
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
export function makeExtractSummaryResultArray(
  input: TextDocumentInput[],
  response: ExtractiveSummarizationResult
): ExtractSummaryResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeExtractSummaryResult,
    makeExtractSummaryErrorResult
  );
}
