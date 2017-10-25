// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource } from "./webResource";

/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `bodyAsJson` property when the response body is received in JSON.
 * @class
 * Initializes a new instance of the HttpOperationResponse class.
 * @constructor
 */
export class HttpOperationResponse {
  /**
   * The raw request
   */
  request: WebResource;
  /**
   * The raw response. Please use the response directly when the response body is a ReadableStream.
   */
  response: Response;
  /**
   * The response body as text (string format)
   */
  bodyAsText: string | null;
  /**
   * The response body as parsed JSON
   */
  bodyAsJson: { [key: string]: any } | Array<any> | string | number | boolean | null | void;

  constructor(request: WebResource, response: Response) {
    /**
     * Reference to the original request object.
     * [WebResource] object.
     * @type {object}
     */
    this.request = request;

    /**
     * Reference to the original response object.
     * [ServerResponse] object.
     * @type {object}
     */
    this.response = response;
    /* tslint:disable:no-null-keyword */
    this.bodyAsText = null;
    this.bodyAsJson = null;
  }
}
