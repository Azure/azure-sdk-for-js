// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";
import { custom } from "./util/inspect";
import { Sanitizer } from "./util/sanitizer";

const errorSanitizer = new Sanitizer();

/**
 * An error resulting from an HTTP request to a REST provider.
 */
export class RestError extends Error {
  /**
   * A constant string to identify errors that may arise when sending out HTTP requests.
   */
  static readonly REQUEST_SEND_ERROR: string = "REQUEST_SEND_ERROR";
  /**
   * A constant string to identify errors that may arise from parsing an incoming HTTP response.
   */
  static readonly PARSE_ERROR: string = "PARSE_ERROR";

  /**
   * String copy of the HTTP status code.
   */
  code?: string;
  /**
   * Numeric copy of the HTTP status code.
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
   * May contain the flattened response.
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
