// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * A set of constants used internally when processing requests.
 */
export const Constants = {
  /**
   * The core-http version
   */
  coreHttpVersion: "2.2.6",

  /**
   * Specifies HTTP.
   */
  HTTP: "http:",

  /**
   * Specifies HTTPS.
   */
  HTTPS: "https:",

  /**
   * Specifies HTTP Proxy.
   */
  HTTP_PROXY: "HTTP_PROXY",

  /**
   * Specifies HTTPS Proxy.
   */
  HTTPS_PROXY: "HTTPS_PROXY",

  /**
   * Specifies NO Proxy.
   */
  NO_PROXY: "NO_PROXY",

  /**
   * Specifies ALL Proxy.
   */
  ALL_PROXY: "ALL_PROXY",

  HttpConstants: {
    /**
     * Http Verbs
     */
    HttpVerbs: {
      PUT: "PUT",
      GET: "GET",
      DELETE: "DELETE",
      POST: "POST",
      MERGE: "MERGE",
      HEAD: "HEAD",
      PATCH: "PATCH",
    },

    StatusCodes: {
      TooManyRequests: 429,
      ServiceUnavailable: 503,
    },
  },

  /**
   * Defines constants for use with HTTP headers.
   */
  HeaderConstants: {
    /**
     * The Authorization header.
     */
    AUTHORIZATION: "authorization",

    AUTHORIZATION_SCHEME: "Bearer",

    /**
     * The Retry-After response-header field can be used with a 503 (Service
     * Unavailable) or 349 (Too Many Requests) responses to indicate how long
     * the service is expected to be unavailable to the requesting client.
     */
    RETRY_AFTER: "Retry-After",

    /**
     * The UserAgent header.
     */
    USER_AGENT: "User-Agent",
  },
};
