// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FormDataMap,
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  ProxySettings,
  RequestBodyType,
  TransferProgressEvent,
} from "./interfaces";
import { createHttpHeaders } from "./httpHeaders";
import { AbortSignalLike } from "./abort-controller/AbortSignalLike";
import { randomUUID } from "./util/uuidUtils";
import { OperationTracingOptions } from "./tracing/interfaces";

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
   * A list of response status codes whose corresponding PipelineResponse body should be treated as a stream.
   */
  streamResponseStatusCodes?: Set<number>;

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
}

class PipelineRequestImpl implements PipelineRequest {
  public url: string;
  public method: HttpMethods;
  public headers: HttpHeaders;
  public timeout: number;
  public withCredentials: boolean;
  public body?: RequestBodyType;
  public formData?: FormDataMap;
  public streamResponseStatusCodes?: Set<number>;
  public enableBrowserStreams: boolean;

  public proxySettings?: ProxySettings;
  public disableKeepAlive: boolean;
  public abortSignal?: AbortSignalLike;
  public requestId: string;
  public tracingOptions?: OperationTracingOptions;
  public allowInsecureConnection?: boolean;
  public onUploadProgress?: (progress: TransferProgressEvent) => void;
  public onDownloadProgress?: (progress: TransferProgressEvent) => void;

  constructor(options: PipelineRequestOptions) {
    this.url = options.url;
    this.body = options.body;
    this.headers = options.headers ?? createHttpHeaders();
    this.method = options.method ?? "GET";
    this.timeout = options.timeout ?? 0;
    this.formData = options.formData;
    this.disableKeepAlive = options.disableKeepAlive ?? false;
    this.proxySettings = options.proxySettings;
    this.streamResponseStatusCodes = options.streamResponseStatusCodes;
    this.withCredentials = options.withCredentials ?? false;
    this.abortSignal = options.abortSignal;
    this.tracingOptions = options.tracingOptions;
    this.onUploadProgress = options.onUploadProgress;
    this.onDownloadProgress = options.onDownloadProgress;
    this.requestId = options.requestId || randomUUID();
    this.allowInsecureConnection = options.allowInsecureConnection ?? false;
    this.enableBrowserStreams = options.enableBrowserStreams ?? false;
  }
}

/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options - The options to create the request with.
 */
export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  return new PipelineRequestImpl(options);
}
