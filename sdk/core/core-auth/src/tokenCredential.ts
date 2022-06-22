// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { TracingContext } from "./tracing";

/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
  /**
   * Gets the token provided by this credential.
   *
   * This method is called automatically by Azure SDK client libraries. You may call this method
   * directly, but you must also handle token caching and token refreshing.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * Defines options for TokenCredential.getToken.
 */
export interface GetTokenOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Options used when creating and sending HTTP requests for this operation.
   */
  requestOptions?: {
    /**
     * The number of milliseconds a request can take before automatically being terminated.
     */
    timeout?: number;
  };
  /**
   * Options used when tracing is enabled.
   */
  tracingOptions?: {
    /**
     * Tracing Context for the current request.
     */
    tracingContext?: TracingContext;
  };

  /**
   * Allows specifying a tenantId. Useful to handle challenges that provide tenant Id hints.
   */
  tenantId?: string;

  /**
   * Claim details to perform the Continuous Access Evaluation authentication flow
   */
  claims?: string;
}

/**
 * Represents an access token with an expiration time.
 */
export interface AccessToken {
  /**
   * The access token returned by the authentication service.
   */
  token: string;

  /**
   * The access token's expiration timestamp in milliseconds, UNIX epoch time.
   */
  expiresOnTimestamp: number;
}

/**
 * Tests an object to determine whether it implements TokenCredential.
 *
 * @param credential - The assumed TokenCredential to be tested.
 */
export function isTokenCredential(credential: unknown): credential is TokenCredential {
  // Check for an object with a 'getToken' function and possibly with
  // a 'signRequest' function.  We do this check to make sure that
  // a ServiceClientCredentials implementor (like TokenClientCredentials
  // in ms-rest-nodeauth) doesn't get mistaken for a TokenCredential if
  // it doesn't actually implement TokenCredential also.
  const castCredential = credential as {
    getToken: unknown;
    signRequest: unknown;
  };
  return (
    castCredential &&
    typeof castCredential.getToken === "function" &&
    (castCredential.signRequest === undefined || castCredential.getToken.length > 0)
  );
}
