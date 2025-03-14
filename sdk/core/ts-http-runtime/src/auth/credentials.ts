// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OAuth2Flow } from "./authFlows.js";

/**
 * Options used when creating and sending get OAuth 2 requests for this operation.
 */
export interface GetOAuth2TokenOptions extends GetTokenOptions {}

/**
 * Options used when creating and sending get bearer token requests for this operation.
 */
export interface GetBearTokenOptions extends GetTokenOptions {}

/**
 * Options used when creating and sending HTTP requests for this operation.
 */
export interface GetTokenOptions {
  /** Abort signal for the request */
  abortSignal?: AbortSignal;
}

/**
 * Credential for OAuth2 authentication flows.
 */
export interface OAuth2TokenCredential<TFlows extends OAuth2Flow> {
  /**
   * Gets an OAuth2 token for the specified flows.
   * @param flows - The OAuth2 flows to use
   * @param options - Options for the request.
   */
  getOAuth2Token(flows: TFlows[], options?: GetOAuth2TokenOptions): Promise<string>;
}

/**
 * Credential for Bearer token authentication.
 */
export interface BearerTokenCredential {
  /**
   * Gets a Bearer token for the specified flows.
   * @param options - Options for the request.
   */
  getBearerToken(options?: GetBearTokenOptions): Promise<string>;
}

/**
 * Credential for HTTP Basic authentication.
 * Provides username and password for basic authentication headers.
 */
export interface BasicCredential {
  /** The username for basic authentication. */
  username: string;
  /** The password for basic authentication. */
  password: string;
}

/**
 * Credential for API Key authentication.
 * Provides an API key that will be used in the request headers.
 */
export interface ApiKeyCredential {
  /** The API key for authentication. */
  key: string;
}

/**
 * Union type of all supported authentication credentials.
 */
export type AuthCredential =
  | OAuth2TokenCredential<OAuth2Flow>
  | BearerTokenCredential
  | BasicCredential
  | ApiKeyCredential;

/**
 * Type guard to check if a credential is an OAuth2 token credential.
 */
export function isOAuth2TokenCredential(
  credential: AuthCredential,
): credential is OAuth2TokenCredential<OAuth2Flow> {
  return "getOAuth2Token" in credential && credential.getOAuth2Token.length > 0;
}

/**
 * Type guard to check if a credential is a Bearer token credential.
 */
export function isBearerTokenCredential(
  credential: AuthCredential,
): credential is BearerTokenCredential {
  return "getBearerToken" in credential;
}

/**
 * Type guard to check if a credential is a Basic auth credential.
 */
export function isBasicCredential(credential: AuthCredential): credential is BasicCredential {
  return "username" in credential && "password" in credential;
}

/**
 * Type guard to check if a credential is an API key credential.
 */
export function isApiKeyCredential(credential: AuthCredential): credential is ApiKeyCredential {
  return "key" in credential;
}
