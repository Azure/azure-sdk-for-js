// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "./restError";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";

export class ResponseBodyNotFoundError extends RestError {
  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    request?: WebResource,
    response?: HttpOperationResponse,
    body?: any
  ) {
    super(message);
    this.name = "ResponseBodyNotFoundError";
    this.code = code;
    this.statusCode = statusCode;
    this.request = request;
    this.response = response;
    this.body = body;

    Object.setPrototypeOf(this, ResponseBodyNotFoundError.prototype);
  }
}
