// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentStatistics,
  TextAnalyticsError as GeneratedTextAnalyticsErrorModel,
  InnerError
} from "./generated/models";

/**
 * The result of a text analytics operation on a single input document.
 */
export type TextAnalyticsResult = TextAnalyticsSuccessResult | TextAnalyticsErrorResult;

/**
 * An Error Code returned from the Text Analytics service. Possible
 * values include:
 *
 * - 'InvalidRequest'
 * - 'InvalidArgument'
 * - 'InternalServerError'
 * - 'ServiceUnavailable'
 * - 'InvalidParameterValue'
 * - 'InvalidRequestBodyFormat'
 * - 'EmptyRequest'
 * - 'MissingInputRecords'
 * - 'InvalidDocument'
 * - 'ModelVersionIncorrect'
 * - 'InvalidDocumentBatch'
 * - 'UnsupportedLanguageCode'
 * - 'InvalidCountryHint'
 *
 * For more information about the error, see the `message` property of the associated error.
 */
export type ErrorCode =
  | "InvalidRequest"
  | "InvalidArgument"
  | "InternalServerError"
  | "ServiceUnavailable"
  | "InvalidParameterValue"
  | "InvalidRequestBodyFormat"
  | "EmptyRequest"
  | "MissingInputRecords"
  | "InvalidDocument"
  | "ModelVersionIncorrect"
  | "InvalidDocumentBatch"
  | "UnsupportedLanguageCode"
  | "InvalidCountryHint";

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

/**
 * Helper function for converting nested service error into
 * the unified TextAnalyticsError
 */
function intoTextAnalyticsError(
  errorModel: GeneratedTextAnalyticsErrorModel | InnerError
): TextAnalyticsError {
  // Return the deepest error. This will always be at most
  // one level for TextAnalytics
  if (errorModel.innerError !== undefined) {
    return intoTextAnalyticsError(errorModel.innerError);
  }

  return {
    // 2020-02-06
    // Cast is necessary for now as swagger generated model
    // does not align with the actual results produced by the
    // TA service in terms of casing.
    code: errorModel.code as ErrorCode,
    message: errorModel.message,
    target: errorModel.target
  };
}

export function makeTextAnalyticsSuccessResult(
  id: string,
  statistics?: TextDocumentStatistics
): TextAnalyticsSuccessResult {
  return {
    id,
    statistics
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
