// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FormDataMap,
  HttpHeaders,
  HttpMethods,
  MultipartRequestBody,
  PipelineRequest,
  ProxySettings,
  RequestBodyType,
  TransferProgressEvent,
} from "./interfaces.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { randomUUID } from "./util/uuidUtils.js";
import { AuthScheme } from "./auth/schemes.js";

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
   *   - NodeJS https.request options:  https://nodejs.org/api/http.html#httprequestoptions-callback
   *   - Browser RequestInit: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
   *
   * WARNING: Options specified here will override any properties of same names when request is sent by {@link HttpClient}.
   */
  requestOverrides?: Record<string, unknown>;
}

class PipelineRequestImpl implements PipelineRequest {
  public url: string;
  public method: HttpMethods;
  public headers: HttpHeaders;
  public timeout: number;
  public withCredentials: boolean;
  public body?: RequestBodyType;
  public multipartBody?: MultipartRequestBody;
  public formData?: FormDataMap;
  public streamResponseStatusCodes?: Set<number>;
  public enableBrowserStreams: boolean;

  public proxySettings?: ProxySettings;
  public disableKeepAlive: boolean;
  public abortSignal?: AbortSignal;
  public requestId: string;
  public allowInsecureConnection?: boolean;
  public onUploadProgress?: (progress: TransferProgressEvent) => void;
  public onDownloadProgress?: (progress: TransferProgressEvent) => void;
  public requestOverrides?: Record<string, unknown>;
  public authSchemes?: AuthScheme[];

  constructor(options: PipelineRequestOptions) {
    this.url = options.url;
    this.body = options.body;
    this.headers = options.headers ?? createHttpHeaders();
    this.method = options.method ?? "GET";
    this.timeout = options.timeout ?? 0;
    this.multipartBody = options.multipartBody;
    this.formData = options.formData;
    this.disableKeepAlive = options.disableKeepAlive ?? false;
    this.proxySettings = options.proxySettings;
    this.streamResponseStatusCodes = options.streamResponseStatusCodes;
    this.withCredentials = options.withCredentials ?? false;
    this.abortSignal = options.abortSignal;
    this.onUploadProgress = options.onUploadProgress;
    this.onDownloadProgress = options.onDownloadProgress;
    this.requestId = options.requestId || randomUUID();
    this.allowInsecureConnection = options.allowInsecureConnection ?? false;
    this.enableBrowserStreams = options.enableBrowserStreams ?? false;
    this.requestOverrides = options.requestOverrides;
    this.authSchemes = options.authSchemes;
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
