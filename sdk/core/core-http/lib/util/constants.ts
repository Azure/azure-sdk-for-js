// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const Constants = {
  /**
   * The core-http version
   * @const
   * @type {string}
   */
  coreHttpVersion: "1.0.2",

  /**
   * Specifies HTTP.
   *
   * @const
   * @type {string}
   */
  HTTP: "http:",

  /**
   * Specifies HTTPS.
   *
   * @const
   * @type {string}
   */
  HTTPS: "https:",

  /**
   * Specifies HTTP Proxy.
   *
   * @const
   * @type {string}
   */
  HTTP_PROXY: "HTTP_PROXY",

  /**
   * Specifies HTTPS Proxy.
   *
   * @const
   * @type {string}
   */
  HTTPS_PROXY: "HTTPS_PROXY",

  HttpConstants: {
    /**
     * Http Verbs
     *
     * @const
     * @enum {string}
     */
    HttpVerbs: {
      PUT: "PUT",
      GET: "GET",
      DELETE: "DELETE",
      POST: "POST",
      MERGE: "MERGE",
      HEAD: "HEAD",
      PATCH: "PATCH"
    },

    StatusCodes: {
      TooManyRequests: 429
    }
  },

  /**
   * Defines constants for use with HTTP headers.
   */
  HeaderConstants: {
    /**
     * The Authorization header.
     *
     * @const
     * @type {string}
     */
    AUTHORIZATION: "authorization",

    AUTHORIZATION_SCHEME: "Bearer",

    /**
     * The Retry-After response-header field can be used with a 503 (Service
     * Unavailable), or 429 (Too Many Requests) responses to indicate how
     * long the service is expected to be unavailable to the requesting client.
     *
     * @const
     * @type {string}
     */
    RETRY_AFTER: "Retry-After",

    /**
     * See `RETRY_AFTER` documentation.
     *
     * @const
     * @type {string}
     */
    RETRY_AFTER_MS: "retry-after-ms",

    /**
     * See `RETRY_AFTER` documentation.
     *
     * @const
     * @type {string}
     */
    X_RETRY_AFTER_MS: "x-ms-retry-after-ms",

    /**
     * The UserAgent header.
     *
     * @const
     * @type {string}
     */
    USER_AGENT: "User-Agent"
  }
};
