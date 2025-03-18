// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OAuth2Flow } from "./authFlows.js";

/** Supported API key locations */
export enum ApiKeyLocation {
  /** API key is included in the query string */
  Query = "query",
  /** API key is included in the request header */
  Header = "header",
  /** API key is included in the cookie */
  Cookie = "cookie",
}

/**
 * Represents HTTP Basic authentication scheme.
 * Basic authentication scheme requires a username and password to be provided with each request.
 * The credentials are encoded using Base64 and included in the Authorization header.
 */
export interface BasicAuthScheme {
  /** Type of auth scheme */
  type: "http";
  /** Basic authentication scheme */
  scheme: "basic";
}

/**
 * Represents HTTP Bearer authentication scheme.
 * Bearer authentication scheme requires a bearer token to be provided with each request.
 * The token is included in the Authorization header with the "Bearer" prefix.
 */
export interface BearerAuthScheme {
  /** Type of auth scheme */
  type: "http";
  /** Bearer authentication scheme */
  scheme: "bearer";
}

/**
 * Represents an endpoint or operation that requires no authentication.
 */
export interface NoAuthAuthScheme {
  /** Type of auth scheme */
  type: "noAuth";
}

/**
 * Represents API Key authentication scheme.
 * API Key authentication requires a key to be provided with each request.
 * The key can be provided in different locations: query parameter, header, or cookie.
 */
export interface ApiKeyAuthScheme {
  /** Type of auth scheme */
  type: "apiKey";
  /** Location of the API key */
  apiKeyLocation: ApiKeyLocation;
  /** Name of the API key parameter */
  name: string;
}

/** Represents OAuth2 authentication scheme with specified flows */
export interface OAuth2AuthScheme<TFlows extends OAuth2Flow[]> {
  /** Type of auth scheme */
  type: "oauth2";
  /** Supported OAuth2 flows */
  flows: TFlows;
}

/** Union type of all supported authentication schemes */
export type AuthScheme =
  | BasicAuthScheme
  | BearerAuthScheme
  | NoAuthAuthScheme
  | ApiKeyAuthScheme
  | OAuth2AuthScheme<OAuth2Flow[]>;
