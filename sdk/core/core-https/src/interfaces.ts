// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { SpanOptions } from "@azure/core-tracing";

// eslint-disable-next-line @azure/azure-sdk/ts-no-namespaces
declare global {
  /**
   * Stub declaration of the browser-only Blob type.
   * Full type information can be obtained by including "lib": ["dom"] in tsconfig.json.
   */
  interface Blob {}

  interface File extends Blob {}

  /** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
  interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): string | File | null;
    getAll(name: string): Array<string | File>;
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(
      callbackfn: (value: string | File, key: string, parent: FormData) => void,
      thisArg?: any
    ): void;
  }
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * Represents a set of HTTP headers on a request/response.
 * Header names are treated as case insensitive.
 */
export interface HttpHeaders extends Iterable<[string, string]> {
  /**
   * Returns the value of a specific header or undefined if not set.
   * @param name The name of the header to retrieve.
   */
  get(name: string): string | undefined;
  /**
   * Returns true if the specified header exists.
   * @param name The name of the header to check.
   */
  has(name: string): boolean;
  /**
   * Sets a specific header with a given value.
   * @param name The name of the header to set.
   * @param value The value to use for the header.
   */
  set(name: string, value: string | number): void;
  /**
   * Removes a specific header from the collection.
   * @param name The name of the header to delete.
   */
  delete(name: string): void;
  /**
   * Duplicates this collection.
   */
  clone(): HttpHeaders;
  /**
   * Accesses a raw JS object that acts as a simple map
   * of header names to values.
   */
  toJSON(): RawHttpHeaders;
}

/**
 * Types of bodies supported on the request.
 * NodeJS.ReadableStream is Node only.
 * Blob is browser only.
 */
export type RequestBodyType =
  | NodeJS.ReadableStream
  | Blob
  | ArrayBuffer
  | ArrayBufferView
  | FormData
  | string
  | null;

/**
 * Metadata about a request being made by the pipeline.
 */
export interface PipelineRequest {
  /**
   * The URL to make the request to.
   */
  url: string;

  /**
   * The HTTP method to use when making the request.
   */
  method: HttpMethods;

  /**
   * The HTTP headers to use when making the request.
   */
  headers: HttpHeaders;

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   * If the request is terminated, an `AbortError` is thrown.
   * Defaults to 0, which disables the timeout.
   */
  timeout: number;

  /**
   * If credentials (cookies) should be sent along during an XHR.
   * Defaults to false.
   */
  withCredentials: boolean;

  /**
   * A unique identifier for the request. Used for logging and tracing.
   */
  requestId: string;

  /**
   * The HTTP body content (if any)
   */
  body?: RequestBodyType;

  /**
   * To simulate a browser form post
   */
  formData?: FormDataMap;

  /**
   * Whether or not the body of the PipelineResponse should be treated as a stream.
   */
  streamResponseBody?: boolean;

  /**
   * Proxy configuration.
   */
  proxySettings?: ProxySettings;

  /**
   * If the connection should be reused.
   */
  keepAlive?: boolean;

  /**
   * Disable automatic decompression based on Accept-Encoding header (Node only)
   */
  skipDecompressResponse?: boolean;

  /**
   * Used to abort the request later.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Options used to create a span when tracing is enabled.
   */
  spanOptions?: SpanOptions;

  /**
   * Clone this request object.
   */
  clone(): PipelineRequest;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Metadata about a response received by the pipeline.
 */
export interface PipelineResponse {
  /**
   * The request that generated this response.
   */
  request: PipelineRequest;
  /**
   * The HTTP status code of the response.
   */
  status: number;
  /**
   * The HTTP response headers.
   */
  headers: HttpHeaders;

  /**
   * The response body as text (string format)
   */
  bodyAsText?: string | null;

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
 * A simple interface for making a pipeline request and receiving a response.
 */
export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;

/**
 * The required interface for a client that makes HTTPS requests
 * on behalf of a pipeline.
 */
export interface HttpsClient {
  /**
   * The method that makes the request and returns a response.
   */
  sendRequest: SendRequest;
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
 * Supported HTTP methods to use when making requests.
 */
export type HttpMethods =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "TRACE";

/**
 * Options to configure a proxy for outgoing requests (Node.js only).
 */
export interface ProxySettings {
  /**
   * The proxy's host address.
   */
  host: string;

  /**
   * The proxy host's port.
   */
  port: number;

  /**
   * The user name to authenticate with the proxy, if required.
   */
  username?: string;

  /**
   * The password to authenticate with the proxy, if required.
   */
  password?: string;
}

/**
 * Each form data entry can be a string or (in the browser) a Blob.
 */
export type FormDataValue = string | Blob;

/**
 * A simple object that provides form data, as if from a browser form.
 */
export type FormDataMap = { [key: string]: FormDataValue | FormDataValue[] };
