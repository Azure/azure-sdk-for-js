// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

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

export interface HttpHeaders extends Iterable<[string, string]> {
  get(name: string): string | undefined;
  has(name: string): boolean;
  set(name: string, value: string | number): void;
  delete(name: string): void;
  clone(): HttpHeaders;
  raw(): RawHttpHeaders;
}

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
   * The HTTP body content (if any)
   */
  body?: NodeJS.ReadableStream | Blob | ArrayBuffer | ArrayBufferView | FormData | string | null;

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
   * The method that makes the request.
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
  /*
   * The proxy's host address.
   */
  host: string;

  /*
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

export type FormDataValue = string | Blob;
export type FormDataMap = { [key: string]: FormDataValue | FormDataValue[] };
