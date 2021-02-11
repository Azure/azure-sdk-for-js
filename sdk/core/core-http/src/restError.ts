// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";
import { custom } from "./util/inspect";
import { Sanitizer } from "./util/sanitizer";

const errorSanitizer = new Sanitizer();

export class RestError extends Error {
  static readonly REQUEST_SEND_ERROR: string = "REQUEST_SEND_ERROR";
  static readonly PARSE_ERROR: string = "PARSE_ERROR";

  code?: string;
  statusCode?: number;
  request?: WebResourceLike;
  response?: HttpOperationResponse;
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
