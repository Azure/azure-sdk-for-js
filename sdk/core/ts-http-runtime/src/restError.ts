// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isError } from "./util/error";
import { PipelineRequest, PipelineResponse } from "./interfaces";
import { custom } from "./util/inspect";
import { Sanitizer } from "./util/sanitizer";

const errorSanitizer = new Sanitizer();

/**
 * The options supported by RestError.
 */
export interface RestErrorOptions {
  /**
   * The code of the error itself (use statics on RestError if possible.)
   */
  code?: string;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  statusCode?: number;
  /**
   * The request that was made.
   */
  request?: PipelineRequest;
  /**
   * The response received (if any.)
   */
  response?: PipelineResponse;
}

/**
 * A custom error type for failed pipeline requests.
 */
export class RestError extends Error {
  /**
   * Something went wrong when making the request.
   * This means the actual request failed for some reason,
   * such as a DNS issue or the connection being lost.
   */
  static readonly REQUEST_SEND_ERROR: string = "REQUEST_SEND_ERROR";
  /**
   * This means that parsing the response from the server failed.
   * It may have been malformed.
   */
  static readonly PARSE_ERROR: string = "PARSE_ERROR";

  /**
   * The code of the error itself (use statics on RestError if possible.)
   */
  public code?: string;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  public statusCode?: number;
  /**
   * The request that was made.
   */
  public request?: PipelineRequest;
  /**
   * The response received (if any.)
   */
  public response?: PipelineResponse;
  /**
   * Bonus property set by the throw site.
   */
  public details?: unknown;

  constructor(message: string, options: RestErrorOptions = {}) {
    super(message);
    this.name = "RestError";
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.request = options.request;
    this.response = options.response;

    Object.setPrototypeOf(this, RestError.prototype);
  }

  /**
   * Logging method for util.inspect in Node
   */
  [custom](): string {
    return `RestError: ${this.message} \n ${errorSanitizer.sanitize(this)}`;
  }
}

/**
 * Typeguard for RestError
 * @param e - Something caught by a catch clause.
 */
export function isRestError(e: unknown): e is RestError {
  if (e instanceof RestError) {
    return true;
  }
  return isError(e) && e.name === "RestError";
}
