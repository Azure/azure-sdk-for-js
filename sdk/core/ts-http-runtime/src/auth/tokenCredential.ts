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
 * Represents the different types of OAuth2 authentication flows supported.
 * Can be either AuthorizationCodeFlow or ClientCredentialsFlow.
 */
export type OAuth2Flow = AuthorizationCodeFlow | ClientCredentialsFlow | BaseOAuth2Flow;

/**
 * Describes the OAuth2 flow type
 */
export enum OAuth2FlowType {
  /**
   * Authorization code flow
   */
  authorizationCode = "authorizationCode",

  /**
   * Client credential flow
   */
  clientCredentials = "clientCredentials",
}

/**
 * Base interface for OAuth2 flow configurations.
 * Contains common properties shared across different OAuth2 flow types.
 */
export interface BaseOAuth2Flow {
  /**
   * The type of OAuth2 flow. Used to differentiate between different authentication flows.
   */
  type: string;

  /**
   * List of scopes for the credential
   */
  scopes?: string[];
}

/**
 * Configuration for OAuth2 Authorization Code flow.
 * This flow is typically used in scenarios where user interaction is possible,
 * such as web applications where users can log in through a browser.
 */
export interface AuthorizationCodeFlow extends BaseOAuth2Flow {
  /**
   * Specifies this is an Authorization Code flow
   */
  type: OAuth2FlowType.authorizationCode;

  /**
   * The authorization URL
   */
  authorizationUrl: string;

  /**
   * The token URL
   */
  tokenUrl: string;

  /**
   * The refresh URL
   */
  refreshUrl?: string;
}

/**
 * Configuration for OAuth2 Client Credentials flow.
 * This flow is used in machine-to-machine authentication scenarios where no user interaction is required.
 */
export interface ClientCredentialsFlow extends BaseOAuth2Flow {
  /**
   * Client credentials flow
   */
  type: OAuth2FlowType.clientCredentials;

  /**
   * The token URL
   */
  tokenUrl: string;

  /**
   * The refresh URL
   */
  refreshUrl?: string;
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
