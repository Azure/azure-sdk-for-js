// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The options supported by RestError.
 */
export interface RestErrorOptions {
  /**
   * The error message.
   */
  message?: string;
  /**
   * A string error code from an underlying system call.
   */
  code?: string;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  statusCode?: number;
  /**
   * The request that was made.
   */
  request?: unknown;
  /**
   * The response received (if any.)
   */
  response?: unknown;
  /**
   * Bonus property set by the throw site.
   */
  details?: unknown;
}

/**
 * A custom error type for failed pipeline requests.
 */
export class RestError extends Error {
  /**
   * A string error code from an underlying system call.
   */
  public code?: string;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  public statusCode?: number;
  /**
   * The request that was made. Recommended to be used only for debugging.
   */
  public request?: unknown;
  /**
   * The response received (if any.). Recommended to be used only for debugging.
   */
  public response?: unknown;
  /**
   * Bonus property set by the throw site.
   */
  public details?: unknown;

  constructor(options: RestErrorOptions = {}) {
    super(options.message);
    this.name = "RestError";
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.request = options.request;
    this.response = options.response;
    this.details = options.details;

    Object.setPrototypeOf(this, RestError.prototype);
  }
}
