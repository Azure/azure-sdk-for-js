// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  TransferProgressEvent,
  RequestBodyType,
  HttpMethods,
  HttpHeaders,
  FormDataMap,
  ProxySettings
} from "./interfaces";
import { createHttpHeaders } from "./httpHeaders";
import { AbortSignalLike } from "@azure/abort-controller";

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
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  return {
    url: options.url,
    body: options.body,
    headers: options.headers ?? createHttpHeaders(),
    method: options.method ?? "GET",
    timeout: options.timeout ?? 0,
    formData: options.formData,
    keepAlive: options.keepAlive,
    proxySettings: options.proxySettings,
    skipDecompressResponse: options.skipDecompressResponse,
    streamResponseBody: options.streamResponseBody,
    withCredentials: options.withCredentials ?? false,
    abortSignal: options.abortSignal,
    onUploadProgress: options.onUploadProgress,
    onDownloadProgress: options.onDownloadProgress
  };
}
