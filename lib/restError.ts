// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource } from "./webResource";
import { HttpOperationResponse } from "./msRest";

export class RestError extends Error {
  code?: string;
  statusCode?: number;
  request?: WebResource;
  response?: HttpOperationResponse;
  body?: any;
  constructor(message: string, code?: string, statusCode?: number, request?: WebResource, response?: HttpOperationResponse, body?: any) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.request = request;
    this.response = response;
    this.body = body;
  }
}