// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";

export class RestError extends Error {
  static readonly REQUEST_SEND_ERROR: string = "REQUEST_SEND_ERROR";
  static readonly PARSE_ERROR: string = "PARSE_ERROR";

  code?: string;
  statusCode?: number;
  request?: WebResource;
  response?: HttpOperationResponse;
  details?: unknown;
  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    request?: WebResource,
    response?: HttpOperationResponse
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.request = request;
    this.response = response;

    Object.setPrototypeOf(this, RestError.prototype);
  }
}
