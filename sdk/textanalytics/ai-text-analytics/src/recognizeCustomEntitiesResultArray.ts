// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  CustomEntitiesResult
} from "./generated/models";
import {
  RecognizeCustomEntitiesResult,
  makeRecognizeCustomEntitiesResult,
  makeRecognizeCustomEntitiesErrorResult
} from "./recognizeCustomEntitiesResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo } from "./textAnalyticsResult";

/**
 * Array of `CustomRecognizeEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizeCustomEntitiesResultArray extends Array<RecognizeCustomEntitiesResult> {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics custom project used by this operation on this
   * batch of input documents.
   */
  projectName: string;
  /**
   * The version of the text analytics custom deployment used by this operation on this
   * batch of input documents.
   */
  deploymentName: string;
}

/**
 * @internal
 */
export function makeRecognizeCustomEntitiesResultArray(
  input: TextDocumentInput[],
  response: CustomEntitiesResult
): RecognizeCustomEntitiesResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo(
    input,
    response,
    makeRecognizeCustomEntitiesResult,
    makeRecognizeCustomEntitiesErrorResult
  );
}
