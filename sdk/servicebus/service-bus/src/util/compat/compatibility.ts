// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  ProxySettings,
} from "@azure/core-rest-pipeline";
import { HttpHeadersLike, HttpHeaders as HttpHeadersV1 } from "./httpHeaders";

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

function toHttpHeaderLike(headers: HttpHeaders): HttpHeadersLike {
  return new HttpHeadersV1(headers.toJSON({ preserveCase: true }));
}

function toWebResourceLike(request: PipelineRequest): WebResourceLike {
  return {
    url: request.url,
    method: request.method,
    headers: toHttpHeaderLike(request.headers),
    withCredentials: request.withCredentials,
    timeout: request.timeout,
    requestId: request.headers.get("x-ms-client-request-id") || "",
  };
}

/**
 * Helper to transform PipelineResponse to slimmed-down HttpResponse used in Service Bus.
 */
export function toHttpResponse(response: PipelineResponse): HttpResponse {
  return {
    request: toWebResourceLike(response.request),
    status: response.status,
    headers: toHttpHeaderLike(response.headers),
  };
}
