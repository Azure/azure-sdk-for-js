// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  Agent,
  HttpMethods,
  PipelineResponse,
  ProxySettings,
  TransferProgressEvent,
} from "@azure/core-rest-pipeline";

/**
 * An individual header within a legacy HTTP header collection.
 */
export interface HttpHeader {
  /** The name of the header. */
  name: string;
  /** The value of the header. */
  value: string;
}

/**
 * A legacy HTTP header collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * The legacy HTTP header collection exposed by the `_response` field.
 */
export interface HttpHeadersLike {
  /**
   * Set a header using a case-insensitive name.
   * @param headerName - The name of the header to set.
   * @param headerValue - The value of the header to set.
   */
  set(headerName: string, headerValue: string | number): void;
  /**
   * Get a header using a case-insensitive name.
   * @param headerName - The name of the header.
   */
  get(headerName: string): string | undefined;
  /**
   * Check whether a header exists.
   * @param headerName - The name of the header.
   */
  contains(headerName: string): boolean;
  /**
   * Remove a header, returning whether it existed.
   * @param headerName - The name of the header.
   */
  remove(headerName: string): boolean;
  /** Get the headers as an object. */
  rawHeaders(): RawHttpHeaders;
  /** Get the headers as an array. */
  headersArray(): HttpHeader[];
  /** Get the header names. */
  headerNames(): string[];
  /** Get the header values. */
  headerValues(): string[];
  /** Create a deep copy of this collection. */
  clone(): HttpHeadersLike;
  /**
   * Get the JSON representation of this collection.
   * @param options - Whether to preserve the original casing of header names.
   */
  toJson(options?: { preserveCase?: boolean }): RawHttpHeaders;
}

/**
 * The legacy HTTP request description exposed by the `_response` field.
 */
export interface WebResourceLike {
  /** The URL being accessed by the request. */
  url: string;
  /** The HTTP method to use. */
  method: HttpMethods;
  /** The HTTP body contents of the request. */
  body?: any;
  /** The HTTP headers to use. */
  headers: HttpHeadersLike;
  /**
   * Whether the response body should be treated as a stream.
   * @deprecated Use streamResponseStatusCodes instead.
   */
  streamResponseBody?: boolean;
  /** Response status codes whose bodies should be treated as streams. */
  streamResponseStatusCodes?: Set<number>;
  /** Form data used to build the request body. */
  formData?: any;
  /** A query string represented as an object. */
  query?: { [key: string]: any };
  /** Whether to send credentials (cookies) during an XHR. */
  withCredentials: boolean;
  /** The number of milliseconds before a request is automatically terminated. */
  timeout: number;
  /** Proxy configuration. */
  proxySettings?: ProxySettings;
  /** Whether to reuse the connection. */
  keepAlive?: boolean;
  /** Whether to decompress the response according to Accept-Encoding (node-fetch only). */
  decompressResponse?: boolean;
  /** A unique identifier for logging and tracing. */
  requestId: string;
  /** A signal that can abort the request. */
  abortSignal?: AbortSignalLike;
  /** A callback that fires on upload progress. */
  onUploadProgress?: (progress: TransferProgressEvent) => void;
  /** A callback that fires on download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  /**
   * A custom HTTP or HTTPS agent shared between requests.
   * Only used in Node.js.
   */
  agent?: Agent;
  /**
   * Additional request options that override properties of the same name when sent.
   * May contain Node.js HTTPS request options or browser RequestInit properties.
   */
  requestOverrides?: Record<string, unknown>;
  /** Clone this request object. */
  clone(): WebResourceLike;
  /** Validate required request properties. A no-op for compatibility purposes. */
  validateRequestProperties(): void;
  /**
   * A legacy preparation method that throws when called on a compatibility request.
   * @param options - Request preparation options.
   */
  prepare(options: unknown): WebResourceLike;
}

/**
 * The legacy HTTP response shape retained for the public `_response` contract.
 */
export interface CompatResponse extends Omit<PipelineResponse, "request" | "headers"> {
  /** The request that generated this response. */
  request: WebResourceLike;
  /** The HTTP response headers. */
  headers: HttpHeadersLike;
  /** The parsed HTTP response headers. */
  parsedHeaders?: { [key: string]: unknown };
  /** The response body as parsed JSON or XML. */
  parsedBody?: any;
}
