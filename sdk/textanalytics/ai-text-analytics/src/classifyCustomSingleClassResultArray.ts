// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  CustomSingleClassificationResult
} from "./generated/models";
import {
  ClassifyCustomSingleClassResult,
  makeClassifyCustomSingleClassResult,
  makeClassifyCustomSingleClassErrorResult
} from "./classifyCustomSingleClassResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo } from "./textAnalyticsResult";

/**
 * Array of `ClassifyCustomSingleClassResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface ClassifyCustomSingleClassResultArray
  extends Array<ClassifyCustomSingleClassResult> {
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
export function makeClassifyCustomSingleClassResultArray(
  input: TextDocumentInput[],
  response: CustomSingleClassificationResult
): ClassifyCustomSingleClassResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo(
    input,
    response,
    makeClassifyCustomSingleClassResult,
    makeClassifyCustomSingleClassErrorResult
  );
}
