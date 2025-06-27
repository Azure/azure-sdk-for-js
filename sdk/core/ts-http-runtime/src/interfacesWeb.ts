// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthScheme } from "./auth/schemes.js";
import type {
  HttpHeaders,
  HttpMethods,
  PipelineRetryOptions,
  TelemetryOptions,
  TransferProgressEvent,
  RedirectPolicyOptions,
  UserAgentPolicyOptions,
} from "./interfacesCommon.js";
export {
  HttpHeaders,
  HttpMethods,
  PipelineRetryOptions,
  RawHttpHeaders,
  RawHttpHeadersInput,
  TransferProgressEvent,
  TelemetryOptions,
  RedirectPolicyOptions,
  UserAgentPolicyOptions,
} from "./interfacesCommon.js";

/**
 * Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have
 * access to the File class, you can use the createFile helper to create one.
 */
export type FormDataValue = string | Blob | File;

/**
 * A simple object that provides form data, as if from a browser form.
 */
export type FormDataMap = { [key: string]: FormDataValue | FormDataValue[] };

/**
 * A part of the request body in a multipart request.
 */
export interface BodyPart {
  /**
   * The headers for this part of the multipart request.
   */
  headers: HttpHeaders;

  /**
   * The body of this part of the multipart request.
   */
  body: (() => ReadableStream<Uint8Array>) | ReadableStream<Uint8Array> | Uint8Array | Blob;
}

/**
 * A request body consisting of multiple parts.
 */
export interface MultipartRequestBody {
  /**
   * The parts of the request body.
   */
  parts: BodyPart[];

  /**
   * The boundary separating each part of the request body.
   * If not specified, a random boundary will be generated.
   *
   * When specified, '--' will be prepended to the boundary in the request to ensure the boundary follows the specification.
   */
  boundary?: string;
}

/**
 * Types of bodies supported on the request.
 */
export type RequestBodyType =
  | ReadableStream<Uint8Array>
  | (() => ReadableStream<Uint8Array>)
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
   * List of authentication schemes used for this specific request.
   * These schemes define how the request will be authenticated.
   *
   * If values are provided, these schemes override the client level authentication schemes.
   * If an empty array is provided, it explicitly specifies no authentication for the request.
   * If not provided at the request level, the client level authentication schemes will be used.
   */
  authSchemes?: AuthScheme[];

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
   * Body for a multipart request.
   */
  multipartBody?: MultipartRequestBody;

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
   * Used to abort the request later.
   */
  abortSignal?: AbortSignal;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;

  /** Set to true if the request is sent over HTTP instead of HTTPS */
  allowInsecureConnection?: boolean;

  /**
   * An option to enable browser Streams. If this option is set and a response is a stream
   * the response will have a property `browserStream` instead of `blobBody` which will be undefined.
   *
   * Default value is false
   */
  enableBrowserStreams?: boolean;

  /**
   * Additional options to set on the request. This provides a way to override
   * existing ones or provide request properties that are not declared.
   *
   * For possible valid properties, see
   *   - Web RequestInit: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
   *
   * WARNING: Options specified here will override any properties of same names when request is sent by {@link HttpClient}.
   */
  requestOverrides?: Record<string, unknown>;
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
   * The response body as a browser Blob.
   */
  blobBody?: Promise<Blob>;

  /**
   * The response body as a browser ReadableStream.
   */
  browserStreamBody?: ReadableStream<Uint8Array>;
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
 * Settings to initialize a request.
 * Almost equivalent to Partial<PipelineRequest>, but url is mandatory.
 */
export interface PipelineRequestOptions {
  /**
   * The URL to make the request to.
   */
  url: string;

  /**
   * The HTTP method to use when making the request.
   */
  method?: HttpMethods;

  /**
   * The HTTP headers to use when making the request.
   */
  headers?: HttpHeaders;

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   * If the request is terminated, an `AbortError` is thrown.
   * Defaults to 0, which disables the timeout.
   */
  timeout?: number;

  /**
   * If credentials (cookies) should be sent along during an XHR.
   * Defaults to false.
   */
  withCredentials?: boolean;

  /**
   * A unique identifier for the request. Used for logging and tracing.
   */
  requestId?: string;

  /**
   * The HTTP body content (if any)
   */
  body?: RequestBodyType;

  /**
   * Body for a multipart request.
   */
  multipartBody?: MultipartRequestBody;

  /**
   * To simulate a browser form post
   */
  formData?: FormDataMap;

  /**
   * A list of response status codes whose corresponding PipelineResponse body should be treated as a stream.
   */
  streamResponseStatusCodes?: Set<number>;

  /**
   * An option to enable use of the Streams API. If this option is set and streaming is used
   * (see `streamResponseStatusCodes`), the response will have a property `browserStream` instead of
   * `blobBody` which will be undefined.
   *
   * Default value is false
   */
  enableBrowserStreams?: boolean;

  /**
   * Used to abort the request later.
   */
  abortSignal?: AbortSignal;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;

  /** Set to true if the request is sent over HTTP instead of HTTPS */
  allowInsecureConnection?: boolean;

  /**
   * List of authentication schemes used for this specific request.
   * These schemes define how the request will be authenticated.
   *
   * If values are provided, these schemes override the client level authentication schemes.
   * If an empty array is provided, it explicitly specifies no authentication for the request.
   * If not provided at the request level, the client level authentication schemes will be used.
   */
  authSchemes?: AuthScheme[];

  /**
   * Additional options to set on the request. This provides a way to override
   * existing ones or provide request properties that are not declared.
   *
   * For possible valid properties, see
   *   - Browser RequestInit: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
   *
   * WARNING: Options specified here will override any properties of same names when request is sent by {@link HttpClient}.
   */
  requestOverrides?: Record<string, unknown>;
}

/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: PipelineRetryOptions;

  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: RedirectPolicyOptions;

  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentPolicyOptions;

  /**
   * Options for setting common telemetry and tracing info to outgoing requests.
   */
  telemetryOptions?: TelemetryOptions;
}
