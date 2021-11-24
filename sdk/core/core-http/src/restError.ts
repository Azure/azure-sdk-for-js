// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";
import { custom } from "./util/inspect";
import { Sanitizer } from "./util/sanitizer";

const errorSanitizer = new Sanitizer();

/**
 * An error resulting from an HTTP request to a service endpoint.
 */
export class RestError extends Error {
  /**
   * A constant string to identify errors that may arise when making an HTTP request that indicates an issue with the transport layer (e.g. the hostname of the URL cannot be resolved via DNS.)
   */
  static readonly REQUEST_SEND_ERROR: string = "REQUEST_SEND_ERROR";
  /**
   * A constant string to identify errors that may arise from parsing an incoming HTTP response. Usually indicates a malformed HTTP body, such as an encoded JSON payload that is incomplete.
   */
  static readonly PARSE_ERROR: string = "PARSE_ERROR";

  /**
   * The error code, if any. Can be one of the static error code properties (REQUEST_SEND_ERROR / PARSE_ERROR) or can be a string code from an underlying system call (E_NOENT).
   */
  code?: string;
  /**
   * The HTTP status code of the response, if one was returned.
   */
  statusCode?: number;
  /**
   * Outgoing request.
   */
  request?: WebResourceLike;
  /**
   * Incoming response.
   */
  response?: HttpOperationResponse;
  /**
   * Any additional details. In the case of deserialization errors, can be the processed response.
   */
  details?: unknown;
  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    request?: WebResourceLike,
    response?: HttpOperationResponse
  ) {
    super(message);
    this.name = "RestError";
    this.code = code;
    this.statusCode = statusCode;
    this.request = request;
    this.response = response;

    Object.setPrototypeOf(this, RestError.prototype);
  }

  /**
   * Logging method for util.inspect in Node
   */
  [custom](): string {
    return `RestError: ${this.message} \n ${errorSanitizer.sanitize(this)}`;
  }
}
