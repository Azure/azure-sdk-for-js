// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "./operationOptions";

/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
  /**
   * Gets the token provided by this credential.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * Defines options for TokenCredential.getToken.
 */
export interface GetTokenOptions extends OperationOptions {}

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
 * @param credential The assumed TokenCredential to be tested.
 */
export function isTokenCredential(credential: any): credential is TokenCredential {
  // Check for an object with a 'getToken' function and possibly with
  // a 'signRequest' function.  We do this check to make sure that
  // a ServiceClientCredentials implementor (like TokenClientCredentials
  // in ms-rest-nodeauth) doesn't get mistaken for a TokenCredential if
  // it doesn't actually implement TokenCredential also.
  return (
    credential &&
    typeof credential.getToken === "function" &&
    (credential.signRequest === undefined || credential.getToken.length > 0)
  );
}
