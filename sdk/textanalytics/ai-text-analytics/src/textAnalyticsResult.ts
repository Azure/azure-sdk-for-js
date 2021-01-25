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
 * The result of a text analytics operation on a single input document.
 */
export type TextAnalyticsResult = TextAnalyticsSuccessResult | TextAnalyticsErrorResult;

/**
 * An Error Code returned from the Text Analytics service. Possible
 * values include:
 *
 * For more information about the error, see the `message` property of the associated error.
 */
export type ErrorCode = ErrorCodeValue | InnerErrorCodeValue;

/**
 * Type describing an error from the Text Analytics service
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

export interface TextAnalyticsResultArray<T1 extends TextAnalyticsSuccessResult>
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

export interface TextAnalyticsResponse<T1 extends TextAnalyticsSuccessResult> {
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

/**
 * Helper function for converting nested service error into
 * the unified TextAnalyticsError
 */
function intoTextAnalyticsError(
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
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array.
 * @param input the array of documents sent to the service for processing.
 * @param response the response received from the service.
 */
export function combineSuccessfulAndErroneousDocuments<TSuccess extends TextAnalyticsSuccessResult>(
  input: TextDocumentInput[],
  response: TextAnalyticsResponse<TSuccess>
): (TSuccess | TextAnalyticsErrorResult)[] {
  return processAndCombineSuccessfulAndErroneousDocuments(input, response, (x) => x);
}

/**
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array.
 * @param input the array of documents sent to the service for processing.
 * @param response the response received from the service.
 * @param process a function to convert the results from one type to another.
 */
export function processAndCombineSuccessfulAndErroneousDocuments<
  TSuccess extends TextAnalyticsSuccessResult,
  T extends TextAnalyticsSuccessResult
>(
  input: TextDocumentInput[],
  response: TextAnalyticsResponse<TSuccess>,
  process: (doc: TSuccess) => T
): (T | TextAnalyticsErrorResult)[] {
  const unsortedResult = response.documents
    .map((document): T | TextAnalyticsErrorResult => process(document))
    .concat(
      response.errors.map((error) => {
        return makeTextAnalyticsErrorResult(error.id, error.error);
      })
    );
  return sortResponseIdObjects(input, unsortedResult);
}

/**
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array. It
 * also attaches statistics and modelVersion to the returned array.
 * @param input the array of documents sent to the service for processing.
 * @param response the response received from the service.
 */
export function combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion<
  TSuccess extends TextAnalyticsSuccessResult
>(
  input: TextDocumentInput[],
  response: TextAnalyticsResponse<TSuccess>
): TextAnalyticsResultArray<TSuccess> {
  const sorted = combineSuccessfulAndErroneousDocuments(input, response);
  return Object.assign(sorted, {
    statistics: response.statistics,
    modelVersion: response.modelVersion
  });
}
