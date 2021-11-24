// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentStatistics,
  TextAnalyticsError as GeneratedTextAnalyticsErrorModel,
  InnerError,
  ErrorCodeValue,
  InnerErrorCodeValue,
  TextAnalyticsWarning,
  DocumentError,
  TextDocumentBatchStatistics,
  TextDocumentInput
} from "./generated/models";
import { sortResponseIdObjects } from "./util";

/**
 * An Error Code returned from the Text Analytics service. Possible
 * values include:
 *
 * For more information about the error, see the `message` property of the associated error.
 */
export type ErrorCode = ErrorCodeValue | InnerErrorCodeValue;

/**
 * Type describing an error from the Text Analytics service.
 */
export interface TextAnalyticsError {
  /**
   * A code describing the kind of error produced
   */
  readonly code: ErrorCode;
  /**
   * A message from the service explaining the error
   */
  readonly message: string;
  /**
   * The target of the particular error (for example, the name of an invalid parameter)
   */
  readonly target?: string;
}

/**
 * Base type for results of text analytics operations corresponding to a single
 * input document.
 */
export interface TextAnalyticsSuccessResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * Statistics about the input document and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  readonly statistics?: TextDocumentStatistics;

  /**
   * An array of warning data corresponding to this document.
   *
   * If no warnings were returned, this array will be empty.
   */
  readonly warnings: TextAnalyticsWarning[];

  /**
   * Discriminant to determine if that this is an error result.
   */
  readonly error?: undefined;
}

/**
 * Base type for error results of text analytics operations corresponding to a
 * single document.
 */
export interface TextAnalyticsErrorResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * The Error for this document result.
   */
  readonly error: TextAnalyticsError;
}

interface StandardTextAnalyticsResultArray<T1 extends TextAnalyticsSuccessResult>
  extends Array<T1 | TextAnalyticsErrorResult> {
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

interface CustomTextAnalyticsResultArray<T1 extends TextAnalyticsSuccessResult>
  extends Array<T1 | TextAnalyticsErrorResult> {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * This field indicates the project name for the model.
   */
  projectName: string;
  /**
   * This field indicates the deployment name for the model.
   */
  deploymentName: string;
}

interface StandardTextAnalyticsResponse<T1 extends TextAnalyticsSuccessResult> {
  /**
   * Response by document
   */
  documents: T1[];
  /**
   * Errors by document id.
   */
  errors: DocumentError[];
  /**
   * if includeStatistics=true was specified in the request this field will contain information about the request payload.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * This field indicates which model is used for scoring.
   */
  modelVersion: string;
}

interface CustomTextAnalyticsResponse<T1 extends TextAnalyticsSuccessResult> {
  /**
   * Response by document
   */
  documents: T1[];
  /**
   * Errors by document id.
   */
  errors: DocumentError[];
  /**
   * if includeStatistics=true was specified in the request this field will contain information about the request payload.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * This field indicates the project name for the model.
   */
  projectName: string;
  /**
   * This field indicates the deployment name for the model.
   */
  deploymentName: string;
}

/**
 * Helper function for converting nested service error into
 * the unified TextAnalyticsError
 * @internal
 */
export function intoTextAnalyticsError(
  errorModel: GeneratedTextAnalyticsErrorModel | InnerError
): TextAnalyticsError {
  // Return the deepest error. This will always be at most
  // one level for TextAnalytics
  if (errorModel.innererror !== undefined) {
    return intoTextAnalyticsError(errorModel.innererror);
  }

  return {
    code: errorModel.code,
    message: errorModel.message,
    target: errorModel.target
  };
}

/**
 * @internal
 */
export function makeTextAnalyticsSuccessResult(
  id: string,
  warnings: TextAnalyticsWarning[],
  statistics?: TextDocumentStatistics
): TextAnalyticsSuccessResult {
  return {
    id,
    statistics,
    warnings
  };
}

/**
 * @internal
 */
export function makeTextAnalyticsErrorResult(
  id: string,
  error: GeneratedTextAnalyticsErrorModel
): TextAnalyticsErrorResult {
  return {
    id,
    error: intoTextAnalyticsError(error)
  };
}

/**
 * @internal
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array.
 * @param input - the array of documents sent to the service for processing.
 * @param response - the response received from the service.
 * @param process - a function to convert the results from one type to another.
 */
export function processAndCombineSuccessfulAndErroneousDocuments<
  TSuccessService extends TextAnalyticsSuccessResult,
  TSuccessSDK extends TextAnalyticsSuccessResult,
  TError extends TextAnalyticsErrorResult
>(
  input: TextDocumentInput[],
  response: {
    documents: TSuccessService[];
    errors: DocumentError[];
  },
  processSuccess: (successResult: TSuccessService) => TSuccessSDK,
  processError: (id: string, error: GeneratedTextAnalyticsErrorModel) => TError
): (TSuccessSDK | TextAnalyticsErrorResult)[] {
  const successResults: (TSuccessSDK | TextAnalyticsErrorResult)[] = response.documents.map(
    processSuccess
  );
  const unsortedResults = successResults.concat(
    response.errors.map((error) => processError(error.id, error.error))
  );

  return sortResponseIdObjects(input, unsortedResults);
}

/**
 * @internal
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array. It
 * also attaches statistics and modelVersion to the returned array.
 * @param input - the array of documents sent to the service for processing.
 * @param response - the response received from the service.
 */
export function combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion<
  TSuccessService extends TextAnalyticsSuccessResult,
  TSuccessSDK extends TextAnalyticsSuccessResult,
  TError extends TextAnalyticsErrorResult
>(
  input: TextDocumentInput[],
  response: StandardTextAnalyticsResponse<TSuccessService>,
  processSuccess: (doc: TSuccessService) => TSuccessSDK,
  processError: (id: string, error: GeneratedTextAnalyticsErrorModel) => TError
): StandardTextAnalyticsResultArray<TSuccessSDK> {
  const sorted = processAndCombineSuccessfulAndErroneousDocuments(
    input,
    response,
    processSuccess,
    processError
  );
  return Object.assign(sorted, {
    statistics: response.statistics,
    modelVersion: response.modelVersion
  });
}

/**
 * @internal
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array. It
 * also attaches statistics, projectName, and deploymentName to the returned array.
 * @param input - the array of documents sent to the service for processing.
 * @param response - the response received from the service.
 */
export function combineSuccessfulAndErroneousDocumentsWithStatisticsAndCustomProjectInfo<
  TSuccessService extends TextAnalyticsSuccessResult,
  TSuccessSDK extends TextAnalyticsSuccessResult,
  TError extends TextAnalyticsErrorResult
>(
  input: TextDocumentInput[],
  response: CustomTextAnalyticsResponse<TSuccessService>,
  processSuccess: (doc: TSuccessService) => TSuccessSDK,
  processError: (id: string, error: GeneratedTextAnalyticsErrorModel) => TError
): CustomTextAnalyticsResultArray<TSuccessSDK> {
  const sorted = processAndCombineSuccessfulAndErroneousDocuments(
    input,
    response,
    processSuccess,
    processError
  );
  return Object.assign(sorted, {
    statistics: response.statistics,
    projectName: response.projectName,
    deploymentName: response.deploymentName
  });
}
