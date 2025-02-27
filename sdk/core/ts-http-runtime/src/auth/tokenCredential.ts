// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
  /**
   * Gets the token provided by this credential.
   *
   * This method is called automatically by client libraries. It will be called
   * directly, so you must handle token caching and token refreshing as necessary.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  getToken(scopes: string | string[]): Promise<AccessToken | undefined>;
}

/**
 * Represents an access token with an expiration time.
 */
export interface AccessToken {
  /**
   * The access token returned by the authentication service.
   */
  token: string;
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
