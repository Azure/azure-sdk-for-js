// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationTracingOptions } from "@azure/core-tracing";

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * A HttpHeaders collection for input, represented as a simple JSON object.
 */
export type RawHttpHeadersInput = Record<string, string | number | boolean>;

/**
 * Represents a set of HTTP headers on a request/response.
 * Header names are treated as case insensitive.
 */
export interface HttpHeaders extends Iterable<[string, string]> {
  /**
   * Returns the value of a specific header or undefined if not set.
   * @param name - The name of the header to retrieve.
   */
  get(name: string): string | undefined;
  /**
   * Returns true if the specified header exists.
   * @param name - The name of the header to check.
   */
  has(name: string): boolean;
  /**
   * Sets a specific header with a given value.
   * @param name - The name of the header to set.
   * @param value - The value to use for the header.
   */
  set(name: string, value: string | number | boolean): void;
  /**
   * Removes a specific header from the collection.
   * @param name - The name of the header to delete.
   */
  delete(name: string): void;
  /**
   * Accesses a raw JS object that acts as a simple map
   * of header names to values.
   */
  toJSON(options?: { preserveCase?: boolean }): RawHttpHeaders;
}

/**
 * Types of bodies supported on the request.
 * NodeJS.ReadableStream and () =\> NodeJS.ReadableStream is Node only.
 * Blob, ReadableStream<Uint8Array>, and () =\> ReadableStream<Uint8Array> are browser only.
 */
export type RequestBodyType =
  | NodeJS.ReadableStream
  | (() => NodeJS.ReadableStream)
  | ReadableStream<Uint8Array>
  | (() => ReadableStream<Uint8Array>)
  | Blob
  | ArrayBuffer
  | ArrayBufferView
  | FormData
  | string
  | null;

/**
 * An interface compatible with NodeJS's `http.Agent`.
 * We want to avoid publicly re-exporting the actual interface,
 * since it might vary across runtime versions.
 */
export interface Agent {
  /**
   * Destroy any sockets that are currently in use by the agent.
   */
  destroy(): void;
  /**
   * For agents with keepAlive enabled, this sets the maximum number of sockets that will be left open in the free state.
   */
  maxFreeSockets: number;
  /**
   * Determines how many concurrent sockets the agent can have open per origin.
   */
  maxSockets: number;
  /**
   * An object which contains queues of requests that have not yet been assigned to sockets.
   */
  requests: unknown;
  /**
   * An object which contains arrays of sockets currently in use by the agent.
   */
  sockets: unknown;
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
   * Indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests.
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
   * A list of response status codes whose corresponding PipelineResponse body should be treated as a stream.
   * When streamResponseStatusCodes contains the value Number.POSITIVE_INFINITY any status would be treated as a stream.
   */
  streamResponseStatusCodes?: Set<number>;

  /**
   * Proxy configuration.
   */
  proxySettings?: ProxySettings;

  /**
   * If the connection should not be reused.
   */
  disableKeepAlive?: boolean;

  /**
   * Used to abort the request later.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Tracing options to use for any created Spans.
   */
  tracingOptions?: OperationTracingOptions;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;

  /** Set to true if the request is sent over HTTP instead of HTTPS */
  allowInsecureConnection?: boolean;

  /**
   * NODEJS ONLY
   *
   * A Node-only option to provide a custom `http.Agent`/`https.Agent`.
   * Does nothing when running in the browser.
   */
  agent?: Agent;

  /**
   * BROWSER ONLY
   *
   * A browser only option to enable browser Streams. If this option is set and a response is a stream
   * the response will have a property `browserStream` instead of `blobBody` which will be undefined.
   *
   * Default value is false
   */
  enableBrowserStreams?: boolean;
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
   * BROWSER ONLY
   *
   * The response body as a browser ReadableStream.
   * Always undefined in node.js.
   */
  browserStreamBody?: ReadableStream<Uint8Array>;

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
 * The required interface for a client that makes HTTP requests
 * on behalf of a pipeline.
 */
export interface HttpClient {
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

/**
 * Options that control how to retry failed requests.
 */
export interface PipelineRetryOptions {
  /**
   * The maximum number of retry attempts. Defaults to 3.
   */
  maxRetries?: number;

  /**
   * The amount of delay in milliseconds between retry attempts. Defaults to 1000
   * (1 second). The delay increases exponentially with each retry up to a maximum
   * specified by maxRetryDelayInMs.
   */
  retryDelayInMs?: number;

  /**
   * The maximum delay in milliseconds allowed before retrying an operation. Defaults
   * to 64000 (64 seconds).
   */
  maxRetryDelayInMs?: number;
}
