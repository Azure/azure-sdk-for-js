// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents the different types of OAuth2 authentication flows supported.
 * Can be AuthorizationCodeFlow, ClientCredentialsFlow, ImplicitFlow, or PasswordFlow.
 */
export type OAuth2Flow =
  | AuthorizationCodeFlow
  | ClientCredentialsFlow
  | ImplicitFlow
  | PasswordFlow
  | BaseOAuth2Flow;

/**
 * Describes the OAuth2 flow types.
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

  /**
   * Implicit flow
   */
  implicit = "implicit",

  /**
   * Password flow
   */
  password = "password",
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
 */
export interface AuthorizationCodeFlow extends BaseOAuth2Flow {
  /**
   * Specifies this is an Authorization Code flow.
   */
  type: OAuth2FlowType.authorizationCode;

  /**
   * The URL where the user will be redirected to authenticate.
   */
  authorizationUrl: string;

  /**
   * The URL used to obtain an access token.
   */
  tokenUrl: string;

  /**
   * The URL used to refresh an expired access token.
   */
  refreshUrl?: string;
}

/**
 * Configuration for OAuth2 Client Credentials flow.
 */
export interface ClientCredentialsFlow extends BaseOAuth2Flow {
  /**
   * Specifies this is a Client Credentials flow.
   */
  type: OAuth2FlowType.clientCredentials;

  /**
   * The URL used to obtain an access token.
   */
  tokenUrl: string;

  /**
   * The URL used to refresh an expired access token.
   */
  refreshUrl?: string;
}

/**
 * Configuration for OAuth2 Implicit flow.
 */
export interface ImplicitFlow extends BaseOAuth2Flow {
  /**
   * Specifies this is an Implicit flow.
   */
  type: OAuth2FlowType.implicit;

  /**
   * The URL where the user will be redirected to authenticate.
   */
  authorizationUrl: string;

  /**
   * The URL used to refresh an expired access token.
   */
  refreshUrl?: string;
}

/**
 * Configuration for OAuth2 Resource Owner Password flow.
 */
export interface PasswordFlow extends BaseOAuth2Flow {
  /**
   * Specifies this is a Password flow.
   */
  type: OAuth2FlowType.password;

  /**
   * The URL used to obtain an access token.
   */
  tokenUrl: string;

  /**
   * The URL used to refresh an expired access token.
   */
  refreshUrl?: string;
}
