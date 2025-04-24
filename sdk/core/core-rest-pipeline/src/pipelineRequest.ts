// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Agent,
  FormDataMap,
  HttpHeaders,
  MultipartRequestBody,
  PipelineRequest,
  ProxySettings,
  RequestBodyType,
  TlsSettings,
  TransferProgressEvent,
} from "./interfaces.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationTracingOptions } from "@azure/core-tracing";
import type { HttpMethods } from "@azure/core-util";
import {
  createPipelineRequest as tspCreatePipelineRequest,
  type PipelineRequestOptions as TspPipelineRequestOptions,
} from "@typespec/ts-http-runtime";

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
   * NODEJS ONLY
   *
   * A Node-only option to provide a custom `http.Agent`/`https.Agent`.
   * NOTE: usually this should be one instance shared by multiple requests so that the underlying
   *       connection to the service can be reused.
   * Does nothing when running in the browser.
   */
  agent?: Agent;

  /**
   * BROWSER ONLY
   *
   * A browser only option to enable use of the Streams API. If this option is set and streaming is used
   * (see `streamResponseStatusCodes`), the response will have a property `browserStream` instead of
   * `blobBody` which will be undefined.
   *
   * Default value is false
   */
  enableBrowserStreams?: boolean;

  /** Settings for configuring TLS authentication */
  tlsSettings?: TlsSettings;

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
   * Options used to create a span when tracing is enabled.
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
   * Additional options to set on the request. This provides a way to override
   * existing ones or provide request properties that are not declared.
   *
   * For possible valid properties, see
   *   - NodeJS https.request options:  https://nodejs.org/api/http.html#httprequestoptions-callback
   *   - Browser RequestInit: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
   *
   * WARNING: Options specified here will override any properties of same names when request is sent by {@link HttpClient}.
   */
  requestOverrides?: Record<string, unknown>;
}

/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options - The options to create the request with.
 */
export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  // Cast required due to difference between ts-http-runtime requiring AbortSignal while core-rest-pipeline allows
  // the more generic AbortSignalLike. The wrapAbortSignalLike pipeline policy will take care of ensuring that any AbortSignalLike in the request
  // is converted into a true AbortSignal.
  return tspCreatePipelineRequest(options as TspPipelineRequestOptions);
}
