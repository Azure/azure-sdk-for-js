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
  error: string;
  error_description: string;
  error_codes?: number[];
  timestamp?: string;
  trace_id?: string;
  correlation_id?: string;
}

/**
 * Provides details about a failure to authenticate with Azure Active
 * Directory.  The `errorResponse` field contains more details about
 * the specific failure.
 */
export class AuthenticationError extends Error {
  public readonly statusCode: number;
  public readonly errorResponse: ErrorResponse;

  constructor(statusCode: number, errorBody: string | undefined | null) {
    let errorResponse = {
      error: "unknown",
      error_description: "An unknown error occurred and no additional details are available."
    };

    if (errorBody) {
      try {
        // Most error responses will contain JSON-formatted error details
        // in the response body
        errorResponse = JSON.parse(errorBody);
      } catch (e) {
        if (statusCode === 400) {
          errorResponse = {
            error: "authority_not_found",
            error_description: "The specified authority URL was not found."
          };
        } else {
          errorResponse = {
            error: "unknown_error",
            error_description: `An unknown error has occurred. Response body:\n\n${errorBody}`
          };
        }
      }
    } else {
      errorResponse = {
        error: "unknown_error",
        error_description: "An unknown error occurred and no additional details are available."
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
    this.name = "AuthenticationError";
  }
}

/**
 * Provides an `errors` array containing {@link AuthenticationError} instance
 * for authentication failures from credentials in a {@link ChainedTokenCredential}.
 */
export class AggregateAuthenticationError extends Error {
  public errors: any[];
  constructor(errors: any[]) {
    super("Authentication failed to complete due to errors");
    this.errors = errors;

    // Ensure that this type reports the correct name
    this.name = "AggregateAuthenticationError";
  }
}
