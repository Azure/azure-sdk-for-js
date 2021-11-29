// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";

/**
 * String URLs used when calling to `fetch()`.
 */
export type CommonRequestInfo = string;

/**
 * An object containing information about the outgoing HTTP request.
 */
export type CommonRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
  body?: any;
  headers?: any;
  signal?: any;
};

/**
 * An object containing information about the incoming HTTP response.
 */
export type CommonResponse = Omit<Response, "body" | "trailer" | "formData"> & {
  body: any;
  trailer: any;
  formData: any;
};

/**
 * An abstract HTTP client that allows custom methods to prepare and send HTTP requests, as well as a custom method to parse the HTTP response.
 * It implements a simple `sendRequest` method that provides minimum viable error handling and the logic that executes the abstract methods.
 * It's intended to be used as the base class for HTTP clients that may use `window.fetch` or an isomorphic alternative.
 *
 * Only supported in Node.js
 */
export abstract class FetchHttpClient implements HttpClient {
  /**
   * Provides minimum viable error handling and the logic that executes the abstract methods.
   *
   * Only supported in Node.js
   * @param httpRequest - Object representing the outgoing HTTP request.
   * @returns An object representing the incoming HTTP response.
   */
  async sendRequest(): Promise<HttpOperationResponse> {
    throw new Error("The FetchHttpClient is not supported in the browser.");
  }

  /**
   * Abstract method that allows preparing an outgoing HTTP request.
   * @param httpRequest - Object representing the outgoing HTTP request.
   */
  abstract prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>>;
  /**
   * Abstract method that allows processing an incoming HTTP response.
   * @param operationResponse - Object representing the incoming HTTP response.
   */
  abstract processRequest(operationResponse: HttpOperationResponse): Promise<void>;
  /**
   * Abstract method that defines how to send an HTTP request.
   * @param input - String URL of the target HTTP server.
   * @param init - Object describing the structure of the outgoing HTTP request.
   */
  abstract fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse>;
}
