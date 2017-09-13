// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource } from "./webResource";

export class RestError extends Error {
  code?: string;
  statusCode?: number;
  request?: WebResource;
  response?: Response;
  body?: any;
  constructor(message: string, code?: string, statusCode?: number, request?: WebResource, response?: Response, body?: any) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.request = request;
    this.response = response;
    this.body = body;
  }
}