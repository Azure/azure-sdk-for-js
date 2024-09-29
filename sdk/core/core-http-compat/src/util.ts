// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpMethods,
  ProxySettings,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpHeaders as HttpHeadersV2, PipelineRequest } from "@azure/core-rest-pipeline";

// We use a custom symbol to cache a reference to the original request without
// exposing it on the public interface.
const originalRequestSymbol = Symbol("Original PipelineRequest");
type CompatWebResourceLike = WebResourceLike & { [originalRequestSymbol]?: PipelineRequest };
// Symbol.for() will return the same symbol if it's already been created
// This particular one is used in core-client to handle the case of when a request is
// cloned but we need to retrieve the OperationSpec and OperationArguments from the
// original request.
const originalClientRequestSymbol = Symbol.for("@azure/core-client original request");
type PipelineRequestWithOriginal = PipelineRequest & {
  [originalClientRequestSymbol]?: PipelineRequest;
};

export function toPipelineRequest(
  webResource: WebResourceLike,
  options: {
    originalRequest?: PipelineRequest;
  } = {},
): PipelineRequest {
  const compatWebResource = webResource as CompatWebResourceLike;
  const request = compatWebResource[originalRequestSymbol];
  const headers = createHttpHeaders(webResource.headers.toJson({ preserveCase: true }));
  if (request) {
    request.headers = headers;
    return request;
  } else {
    const newRequest = createPipelineRequest({
      url: webResource.url,
      method: webResource.method,
      headers,
      withCredentials: webResource.withCredentials,
      timeout: webResource.timeout,
      requestId: webResource.requestId,
      abortSignal: webResource.abortSignal,
      body: webResource.body,
      formData: webResource.formData,
      disableKeepAlive: !!webResource.keepAlive,
      onDownloadProgress: webResource.onDownloadProgress,
      onUploadProgress: webResource.onUploadProgress,
      proxySettings: webResource.proxySettings,
      streamResponseStatusCodes: webResource.streamResponseStatusCodes,
    });
    if (options.originalRequest) {
      (newRequest as PipelineRequestWithOriginal)[originalClientRequestSymbol] =
        options.originalRequest;
    }
    return newRequest;
  }
}

export function toWebResourceLike(
  request: PipelineRequest,
  options?: { createProxy?: boolean; originalRequest?: PipelineRequest },
): WebResourceLike {
  const originalRequest = options?.originalRequest ?? request;
  const webResource: WebResourceLike = {
    url: request.url,
    method: request.method,
    headers: toHttpHeadersLike(request.headers),
    withCredentials: request.withCredentials,
    timeout: request.timeout,
    requestId: request.headers.get("x-ms-client-request-id") || request.requestId,
    abortSignal: request.abortSignal,
    body: request.body,
    formData: request.formData,
    keepAlive: !!request.disableKeepAlive,
    onDownloadProgress: request.onDownloadProgress,
    onUploadProgress: request.onUploadProgress,
    proxySettings: request.proxySettings,
    streamResponseStatusCodes: request.streamResponseStatusCodes,
    clone(): WebResourceLike {
      throw new Error("Cannot clone a non-proxied WebResourceLike");
    },
    prepare(): WebResourceLike {
      throw new Error("WebResourceLike.prepare() is not supported by @azure/core-http-compat");
    },
    validateRequestProperties(): void {
      /** do nothing */
    },
  };

  if (options?.createProxy) {
    return new Proxy(webResource, {
      get(target, prop, receiver) {
        if (prop === originalRequestSymbol) {
          return request;
        } else if (prop === "clone") {
          return () => {
            return toWebResourceLike(toPipelineRequest(webResource, { originalRequest }), {
              createProxy: true,
              originalRequest,
            });
          };
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target: any, prop, value, receiver) {
        if (prop === "keepAlive") {
          request.disableKeepAlive = !value;
        }
        const passThroughProps = [
          "url",
          "method",
          "withCredentials",
          "timeout",
          "requestId",
          "abortSignal",
          "body",
          "formData",
          "onDownloadProgress",
          "onUploadProgress",
          "proxySettings",
          "streamResponseStatusCodes",
        ];

        if (typeof prop === "string" && passThroughProps.includes(prop)) {
          (request as any)[prop] = value;
        }

        return Reflect.set(target, prop, value, receiver);
      },
    });
  } else {
    return webResource;
  }
}

/**
 * Converts HttpHeaders from core-rest-pipeline to look like
 * HttpHeaders from core-http.
 * @param headers - HttpHeaders from core-rest-pipeline
 * @returns HttpHeaders as they looked in core-http
 */
export function toHttpHeadersLike(headers: HttpHeadersV2): HttpHeadersLike {
  return new HttpHeaders(headers.toJSON({ preserveCase: true }));
}

/**
 * A collection of HttpHeaders that can be sent with a HTTP request.
 */
function getHeaderKey(headerName: string): string {
  return headerName.toLowerCase();
}

/**
 * An individual header within a HttpHeaders collection.
 */
export interface HttpHeader {
  /**
   * The name of the header.
   */
  name: string;

  /**
   * The value of the header.
   */
  value: string;
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * A collection of HTTP header key/value pairs.
 */
export interface HttpHeadersLike {
  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param headerName - The name of the header to set. This value is case-insensitive.
   * @param headerValue - The value of the header to set.
   */
  set(headerName: string, headerValue: string | number): void;
  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param headerName - The name of the header.
   */
  get(headerName: string): string | undefined;
  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   */
  contains(headerName: string): boolean;
  /**
   * Remove the header with the provided headerName. Return whether or not the header existed and
   * was removed.
   * @param headerName - The name of the header to remove.
   */
  remove(headerName: string): boolean;
  /**
   * Get the headers that are contained this collection as an object.
   */
  rawHeaders(): RawHttpHeaders;
  /**
   * Get the headers that are contained in this collection as an array.
   */
  headersArray(): HttpHeader[];
  /**
   * Get the header names that are contained in this collection.
   */
  headerNames(): string[];
  /**
   * Get the header values that are contained in this collection.
   */
  headerValues(): string[];
  /**
   * Create a deep clone/copy of this HttpHeaders collection.
   */
  clone(): HttpHeadersLike;
  /**
   * Get the JSON object representation of this HTTP header collection.
   * The result is the same as `rawHeaders()`.
   */
  toJson(options?: { preserveCase?: boolean }): RawHttpHeaders;
}

/**
 * A collection of HTTP header key/value pairs.
 */
export class HttpHeaders implements HttpHeadersLike {
  private readonly _headersMap: { [headerKey: string]: HttpHeader };

  constructor(rawHeaders?: RawHttpHeaders) {
    this._headersMap = {};
    if (rawHeaders) {
      for (const headerName in rawHeaders) {
        this.set(headerName, rawHeaders[headerName]);
      }
    }
  }

  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param headerName - The name of the header to set. This value is case-insensitive.
   * @param headerValue - The value of the header to set.
   */
  public set(headerName: string, headerValue: string | number): void {
    this._headersMap[getHeaderKey(headerName)] = {
      name: headerName,
      value: headerValue.toString(),
    };
  }

  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param headerName - The name of the header.
   */
  public get(headerName: string): string | undefined {
    const header: HttpHeader = this._headersMap[getHeaderKey(headerName)];
    return !header ? undefined : header.value;
  }

  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   */
  public contains(headerName: string): boolean {
    return !!this._headersMap[getHeaderKey(headerName)];
  }

  /**
   * Remove the header with the provided headerName. Return whether or not the header existed and
   * was removed.
   * @param headerName - The name of the header to remove.
   */
  public remove(headerName: string): boolean {
    const result: boolean = this.contains(headerName);
    delete this._headersMap[getHeaderKey(headerName)];
    return result;
  }

  /**
   * Get the headers that are contained this collection as an object.
   */
  public rawHeaders(): RawHttpHeaders {
    return this.toJson({ preserveCase: true });
  }

  /**
   * Get the headers that are contained in this collection as an array.
   */
  public headersArray(): HttpHeader[] {
    const headers: HttpHeader[] = [];
    for (const headerKey in this._headersMap) {
      headers.push(this._headersMap[headerKey]);
    }
    return headers;
  }

  /**
   * Get the header names that are contained in this collection.
   */
  public headerNames(): string[] {
    const headerNames: string[] = [];
    const headers: HttpHeader[] = this.headersArray();
    for (let i = 0; i < headers.length; ++i) {
      headerNames.push(headers[i].name);
    }
    return headerNames;
  }

  /**
   * Get the header values that are contained in this collection.
   */
  public headerValues(): string[] {
    const headerValues: string[] = [];
    const headers: HttpHeader[] = this.headersArray();
    for (let i = 0; i < headers.length; ++i) {
      headerValues.push(headers[i].value);
    }
    return headerValues;
  }

  /**
   * Get the JSON object representation of this HTTP header collection.
   */
  public toJson(options: { preserveCase?: boolean } = {}): RawHttpHeaders {
    const result: RawHttpHeaders = {};
    if (options.preserveCase) {
      for (const headerKey in this._headersMap) {
        const header: HttpHeader = this._headersMap[headerKey];
        result[header.name] = header.value;
      }
    } else {
      for (const headerKey in this._headersMap) {
        const header: HttpHeader = this._headersMap[headerKey];
        result[getHeaderKey(header.name)] = header.value;
      }
    }
    return result;
  }

  /**
   * Get the string representation of this HTTP header collection.
   */
  public toString(): string {
    return JSON.stringify(this.toJson({ preserveCase: true }));
  }

  /**
   * Create a deep clone/copy of this HttpHeaders collection.
   */
  public clone(): HttpHeaders {
    const resultPreservingCasing: RawHttpHeaders = {};
    for (const headerKey in this._headersMap) {
      const header: HttpHeader = this._headersMap[headerKey];
      resultPreservingCasing[header.name] = header.value;
    }
    return new HttpHeaders(resultPreservingCasing);
  }
}

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

  /**
   * Clone this request object.
   */
  clone(): WebResourceLike;

  /**
   * Validates that the required properties such as method, url, headers["Content-Type"],
   * headers["accept-language"] are defined. It will throw an error if one of the above
   * mentioned properties are not defined.
   * Note: this a no-op for compat purposes.
   */
  validateRequestProperties(): void;

  /**
   * This is a no-op for compat purposes and will throw if called.
   */
  prepare(options: unknown): WebResourceLike;
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
