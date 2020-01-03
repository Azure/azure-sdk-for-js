// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * See the official documentation for more details:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-protocols-oauth-code#error-response-1
 *
 * NOTE: This documentation is for v1 OAuth support but the same error
 * response details still apply to v2.
 */
export interface ErrorResponse {
  /**
   * The string identifier for the error.
   */
  error: string;

  /**
   * The error's description.
   */
  errorDescription: string;

  /**
   * An array of codes pertaining to the error(s) that occurred.
   */
  errorCodes?: number[];

  /**
   * The timestamp at which the error occurred.
   */
  timestamp?: string;

  /**
   * The trace identifier for this error occurrence.
   */
  traceId?: string;

  /**
   * The correlation ID to be used for tracking the source of the error.
   */
  correlationId?: string;
}

/**
 * Used for internal deserialization of OAuth responses. Public model is ErrorResponse
 * @internal
 * @ignore
 */
export interface OAuthErrorResponse {
  error: string;
  error_description: string;
  error_codes?: number[];
  timestamp?: string;
  trace_id?: string;
  correlation_id?: string;
}

function isErrorResponse(errorResponse: any): errorResponse is OAuthErrorResponse {
  return (
    errorResponse &&
    typeof errorResponse.error === "string" &&
    typeof errorResponse.error_description === "string"
  );
}

/**
 * The Error.name value of an AuthenticationError
 */
export const AuthenticationErrorName = "AuthenticationError";

/**
 * Provides details about a failure to authenticate with Azure Active
 * Directory.  The `errorResponse` field contains more details about
 * the specific failure.
 */
export class AuthenticationError extends Error {
  /**
   * The HTTP status code returned from the authentication request.
   */
  public readonly statusCode: number;

  /**
   * The error response details.
   */
  public readonly errorResponse: ErrorResponse;

  constructor(statusCode: number, errorBody: object | string | undefined | null) {
    let errorResponse: ErrorResponse = {
      error: "unknown",
      errorDescription: "An unknown error occurred and no additional details are available."
    };

    if (isErrorResponse(errorBody)) {
      errorResponse = convertOAuthErrorResponseToErrorResponse(errorBody);
    } else if (typeof errorBody === "string") {
      try {
        // Most error responses will contain JSON-formatted error details
        // in the response body        
        const oauthErrorResponse: OAuthErrorResponse = JSON.parse(errorBody);
        errorResponse = convertOAuthErrorResponseToErrorResponse(oauthErrorResponse);
      } catch (e) {
        if (statusCode === 400) {
          errorResponse = {
            error: "authority_not_found",
            errorDescription: "The specified authority URL was not found."
          };
        } else {
          errorResponse = {
            error: "unknown_error",
            errorDescription: `An unknown error has occurred. Response body:\n\n${errorBody}`
          };
        }
      }
    } else {
      errorResponse = {
        error: "unknown_error",
        errorDescription: "An unknown error occurred and no additional details are available."
      };
    }

    super(
      `An error was returned while authenticating to Azure Active Directory (status code ${statusCode}).\n\nMore details:\n\n${JSON.stringify(
        errorResponse,
        null,
        "  "
      )}`
    );
    this.statusCode = statusCode;
    this.errorResponse = errorResponse;

    // Ensure that this type reports the correct name
    this.name = AuthenticationErrorName;
  }
}

/**
 * The Error.name value of an AggregateAuthenticationError
 */
export const AggregateAuthenticationErrorName = "AggregateAuthenticationError";

/**
 * Provides an `errors` array containing {@link AuthenticationError} instance
 * for authentication failures from credentials in a {@link ChainedTokenCredential}.
 */
export class AggregateAuthenticationError extends Error {
  /**
   * The array of error objects that were thrown while trying to authenticate
   * with the credentials in a {@link ChainedTokenCredential}.
   */
  public errors: any[];

  constructor(errors: any[]) {
    super(
      `Authentication failed to complete due to the following errors:\n\n${errors.join("\n\n")}`
    );
    this.errors = errors;

    // Ensure that this type reports the correct name
    this.name = AggregateAuthenticationErrorName;
  }
}

function convertOAuthErrorResponseToErrorResponse(errorBody: OAuthErrorResponse) : ErrorResponse {
  return {
    error: errorBody.error,
    errorDescription: errorBody.error_description,
    correlationId: errorBody.correlation_id,
    errorCodes: errorBody.error_codes,
    timestamp: errorBody.timestamp,
    traceId: errorBody.trace_id
  };
}
