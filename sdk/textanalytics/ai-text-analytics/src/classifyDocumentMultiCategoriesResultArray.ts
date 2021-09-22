// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  CustomMultiClassificationResult
} from "./generated/models";
import {
  ClassifyDocumentMultiCategoriesResult,
  makeClassifyDocumentMultiCategoriesResult,
  makeClassifyDocumentMultiCategoriesErrorResult
} from "./classifyDocumentMultiCategoriesResult";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo } from "./textAnalyticsResult";

/**
 * Array of `CustomClassifyDocumentMultiCategoriesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface ClassifyDocumentMultiCategoriesResultArray
  extends Array<ClassifyDocumentMultiCategoriesResult> {
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
export function makeClassifyDocumentMultiCategoriesResultArray(
  input: TextDocumentInput[],
  response: CustomMultiClassificationResult
): ClassifyDocumentMultiCategoriesResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo(
    input,
    response,
    makeClassifyDocumentMultiCategoriesResult,
    makeClassifyDocumentMultiCategoriesErrorResult
  );
}
