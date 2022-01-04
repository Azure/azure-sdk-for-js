// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  KeyPhraseResult,
} from "./generated/models";
import {
  ExtractKeyPhrasesResult,
  makeExtractKeyPhrasesResult,
  makeExtractKeyPhrasesErrorResult,
} from "./extractKeyPhrasesResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult";

/**
 * Array of `ExtractKeyPhrasesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface ExtractKeyPhrasesResultArray extends Array<ExtractKeyPhrasesResult> {
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
export function makeExtractKeyPhrasesResultArray(
  input: TextDocumentInput[],
  response: KeyPhraseResult
): ExtractKeyPhrasesResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeExtractKeyPhrasesResult,
    makeExtractKeyPhrasesErrorResult
  );
}
