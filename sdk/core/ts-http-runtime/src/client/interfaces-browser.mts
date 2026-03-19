// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse, PathUncheckedResponse } from "./common.js";

/**
 * Http Response which body is a NodeJS stream object
 */
export type HttpBrowserStreamResponse = HttpResponse & {
  /**
   * Streamable body
   */
  body?: ReadableStream<Uint8Array>;
};

/**
 * Defines the type for a method that supports getting the response body as
 * a raw stream
 */
export type StreamableMethod<TResponse = PathUncheckedResponse> = PromiseLike<TResponse> & {
  /**
   * Returns the response body as a browser (Web) stream. Only available in the browser. If you require a Web Stream of the response in Node, consider using the
   * `Readable.toWeb` Node API on the result of `asNodeStream`.
   */
  asBrowserStream: () => Promise<HttpBrowserStreamResponse>;
};

export type HttpNodeStreamResponse = never;
