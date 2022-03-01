// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { HttpMethods, ProxySettings } from "@azure/core-rest-pipeline";

/**
 * An individual header within a HttpHeaders collection.
 */
export interface HttpHeader {
  /**
   * The name of the header.
   */
  name: string;

  /**
   * The value of the header.
   */
  value: string;
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

export interface HttpHeadersLike {
  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param headerName - The name of the header to set. This value is case-insensitive.
   * @param headerValue - The value of the header to set.
   */
  set(headerName: string, headerValue: string | number): void;
  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param headerName - The name of the header.
   */
  get(headerName: string): string | undefined;
  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   */
  contains(headerName: string): boolean;
  /**
   * Remove the header with the provided headerName. Return whether or not the header existed and
   * was removed.
   * @param headerName - The name of the header to remove.
   */
  remove(headerName: string): boolean;
  /**
   * Get the headers that are contained this collection as an object.
   */
  rawHeaders(): RawHttpHeaders;
  /**
   * Get the headers that are contained in this collection as an array.
   */
  headersArray(): HttpHeader[];
  /**
   * Get the header names that are contained in this collection.
   */
  headerNames(): string[];
  /**
   * Get the header values that are contained in this collection.
   */
  headerValues(): string[];
  /**
   * Create a deep clone/copy of this HttpHeaders collection.
   */
  clone(): HttpHeadersLike;
  /**
   * Get the JSON object representation of this HTTP header collection.
   * The result is the same as `rawHeaders()`.
   */
  toJson(options?: { preserveCase?: boolean }): RawHttpHeaders;
}

/**
 * Fired in response to upload or download progress.
 */
export type TransferProgressEvent = {
  /**
   * The number of bytes loaded so far.
   */
  loadedBytes: number;
};

/**
 * A description of a HTTP request to be made to a remote server.
 */
export interface WebResourceLike {
  /**
   * The URL being accessed by the request.
   */
  url: string;
  /**
   * The HTTP method to use when making the request.
   */
  method: HttpMethods;
  /**
   * The HTTP body contents of the request.
   */
  body?: any;
  /**
   * The HTTP headers to use when making the request.
   */
  headers: HttpHeadersLike;
  /**
   * Whether or not the body of the HttpOperationResponse should be treated as a stream.
   * @deprecated Use streamResponseStatusCodes property instead.
   */
  streamResponseBody?: boolean;
  /**
   * A list of response status codes whose corresponding HttpOperationResponse body should be treated as a stream.
   */
  streamResponseStatusCodes?: Set<number>;
  /**
   * Form data, used to build the request body.
   */
  formData?: any;
  /**
   * A query string represented as an object.
   */
  query?: { [key: string]: any };
  /**
   * If credentials (cookies) should be sent along during an XHR.
   */
  withCredentials: boolean;
  /**
   * The number of milliseconds a request can take before automatically being terminated.
   * If the request is terminated, an `AbortError` is thrown.
   */
  timeout: number;
  /**
   * Proxy configuration.
   */
  proxySettings?: ProxySettings;
  /**
   * If the connection should be reused.
   */
  keepAlive?: boolean;
  /**
   * Whether or not to decompress response according to Accept-Encoding header (node-fetch only)
   */
  decompressResponse?: boolean;
  /**
   * A unique identifier for the request. Used for logging and tracing.
   */
  requestId: string;

  /**
   * Signal of an abort controller. Can be used to abort both sending a network request and waiting for a response.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * The properties on an HTTP response which will always be present.
 */
export interface HttpResponse {
  /**
   * The raw request
   */
  request: WebResourceLike;

  /**
   * The HTTP response status (e.g. 200)
   */
  status: number;

  /**
   * The HTTP response headers.
   */
  headers: HttpHeadersLike;
}
