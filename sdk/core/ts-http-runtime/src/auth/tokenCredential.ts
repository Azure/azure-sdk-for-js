// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OAuth2Flow, OAuth2FlowType } from "./authFlows.js";

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
  getToken(options?: GetTokenOptions): Promise<AccessToken>;
}

/**
 * Options used when creating and sending HTTP requests for this operation.
 */
export interface GetTokenOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignal;
  /**
   * OAuth2 flow metadata used during token acquisition.
   */
  authFlows?: OAuth2Flow[];
}

/**
 * Represents an access token.
 */
export interface AccessToken {
  /**
   * The access token returned by the authentication service.
   */
  token: string;
}

/**
 * Abstract base class for Authorization Code credentials.
 */
export abstract class AuthorizationCodeCredential implements TokenCredential {
  /**
   * The type of OAuth2 flow
   */
  public readonly type: OAuth2FlowType.authorizationCode = OAuth2FlowType.authorizationCode;

  /**
   * Gets the token provided by this credential.
   * @param options - The options used to configure any requests this TokenCredential implementation might make.
   */
  abstract getToken(options?: GetTokenOptions): Promise<AccessToken>;
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
