// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const Constants = {
  /**
   * The core-http version
   * @const
   * @type {string}
   */
  coreHttpVersion: "1.0.0-preview.2",

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
     * Unavailable) or 349 (Too Many Requests) responses to indicate how long
     * the service is expected to be unavailable to the requesting client.
     *
     * @const
     * @type {string}
     */
    RETRY_AFTER: "Retry-After",

    /**
     * The UserAgent header.
     *
     * @const
     * @type {string}
     */
    USER_AGENT: "User-Agent"
  },

  /**
   * Constant representing the Odata Error 'message' property
   *
   * @const
   * @type {string}
   */
  ODATA_ERROR_MESSAGE: "message",
  /**
   * Constant representing the 'value' property of Odata Error 'message' property
   *
   * @const
   * @type {string}
   */
  ODATA_ERROR_MESSAGE_VALUE: "value",

  /**
   * Constant representing the property where the atom default elements are stored.
   *
   * @const
   * @type {string}
   */
  ATOM_METADATA_MARKER: "_",

  /**
   * Marker for atom metadata.
   *
   * @const
   * @type {string}
   */
  XML_METADATA_MARKER: "$",

  /**
   * Marker for atom value.
   *
   * @const
   * @type {string}
   */
  XML_VALUE_MARKER: "_",

  HttpResponseCodes: {
    200: "Ok",
    201: "Created",
    202: "Accepted",
    204: "NoContent",
    206: "PartialContent",
    400: "BadRequest",
    401: "Unauthorized",
    403: "Forbidden",
    404: "NotFound",
    409: "Conflict",
    411: "LengthRequired",
    412: "PreconditionFailed"
  }
};
