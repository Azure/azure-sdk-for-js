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
import { generateUuid } from "./util/uuid";
import { SpanOptions } from "@azure/core-tracing";

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
   * If the connection should be reused. Defaults to true.
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
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

class PipelineRequestImpl implements PipelineRequest {
  public url: string;
  public method: HttpMethods;
  public headers: HttpHeaders;
  public timeout: number;
  public withCredentials: boolean;
  public body?: RequestBodyType;
  public formData?: FormDataMap;
  public streamResponseBody: boolean;
  public proxySettings?: ProxySettings;
  public keepAlive: boolean;
  public skipDecompressResponse: boolean;
  public abortSignal?: AbortSignalLike;
  public requestId: string;
  public spanOptions?: SpanOptions;
  public onUploadProgress?: (progress: TransferProgressEvent) => void;
  public onDownloadProgress?: (progress: TransferProgressEvent) => void;

  constructor(options: PipelineRequestOptions) {
    this.url = options.url;
    this.body = options.body;
    this.headers = options.headers ?? createHttpHeaders();
    this.method = options.method ?? "GET";
    this.timeout = options.timeout ?? 0;
    this.formData = options.formData;
    this.keepAlive = options.keepAlive ?? true;
    this.proxySettings = options.proxySettings;
    this.skipDecompressResponse = options.skipDecompressResponse ?? false;
    this.streamResponseBody = options.streamResponseBody ?? false;
    this.withCredentials = options.withCredentials ?? false;
    this.abortSignal = options.abortSignal;
    this.spanOptions = options.spanOptions;
    this.onUploadProgress = options.onUploadProgress;
    this.onDownloadProgress = options.onDownloadProgress;
    this.requestId = options.requestId || generateUuid();
  }

  public clone(): PipelineRequest {
    return new PipelineRequestImpl({
      url: this.url,
      abortSignal: this.abortSignal,
      body: this.body,
      formData: this.formData,
      headers: this.headers.clone(),
      keepAlive: this.keepAlive,
      method: this.method,
      onDownloadProgress: this.onDownloadProgress,
      onUploadProgress: this.onUploadProgress,
      proxySettings: this.proxySettings,
      skipDecompressResponse: this.skipDecompressResponse,
      streamResponseBody: this.streamResponseBody,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      spanOptions: this.spanOptions,
      requestId: this.requestId
    });
  }
}

/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options The options to create the request with.
 */
export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  return new PipelineRequestImpl(options);
}
