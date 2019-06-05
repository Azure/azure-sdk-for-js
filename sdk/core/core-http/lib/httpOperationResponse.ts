// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource } from "./webResource";
import { HttpHeaders } from "./httpHeaders";

/**
 * The properties on an HTTP response which will always be present.
 */
export interface HttpResponse {
  /**
   * The raw request
   */
  request: WebResource;

  /**
   * The HTTP response status (e.g. 200)
   */
  status: number;

  /**
   * The HTTP response headers.
   */
  headers: HttpHeaders;
}

declare global {
  /**
   * Stub declaration of the browser-only Blob type.
   * Full type information can be obtained by including "lib": ["dom"] in tsconfig.json.
   */
  interface Blob {}
}

/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `parsedBody` property when the response body is received in JSON or XML.
 */
export interface HttpOperationResponse extends HttpResponse {
  /**
   * The parsed HTTP response headers.
   */
  parsedHeaders?: { [key: string]: any };

  /**
   * The response body as text (string format)
   */
  bodyAsText?: string | null;

  /**
   * The response body as parsed JSON or XML
   */
  parsedBody?: any;

  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always undefined in node.js.
   */
  blobBody?: Promise<Blob>;

  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always undefined in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
}

/**
 * The flattened response to a REST call.
 * Contains the underlying HttpOperationResponse as well as
 * the merged properties of the parsedBody, parsedHeaders, etc.
 */
export interface RestResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpOperationResponse;

  [key: string]: any;
}
