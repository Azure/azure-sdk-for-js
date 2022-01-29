// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, SpanOptions } from "@azure/core-tracing";
import { HttpHeaders, HttpHeadersLike, isHttpHeadersLike } from "./httpHeaders";
import { Mapper, Serializer } from "./serializer";
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpOperationResponse } from "./httpOperationResponse";
import { OperationResponse } from "./operationResponse";
import { OperationSpec } from "./operationSpec";
import { ProxySettings } from "./serviceClient";
import { SerializerOptions } from "./util/serializer.common";
import { generateUuid } from "./util/utils";

/**
 * List of supported HTTP methods.
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
 * Possible HTTP request body types
 */
export type HttpRequestBody =
  | Blob
  | string
  | ArrayBuffer
  | ArrayBufferView
  | (() => NodeJS.ReadableStream);

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
   * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
   * HttpOperationResponse should be deserialized.
   */
  shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
  /**
   * A function that returns the proper OperationResponse for the given OperationSpec and
   * HttpOperationResponse combination. If this is undefined, then a simple status code lookup will
   * be used.
   */
  operationResponseGetter?: (
    operationSpec: OperationSpec,
    response: HttpOperationResponse
  ) => undefined | OperationResponse;
  /**
   * Form data, used to build the request body.
   */
  formData?: any;
  /**
   * A query string represented as an object.
   */
  query?: { [key: string]: any };
  /**
   * Used to parse the response.
   */
  operationSpec?: OperationSpec;
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
   * Tracing: Context used when creating spans.
   */
  tracingContext?: Context;

  /**
   * Validates that the required properties such as method, url, headers["Content-Type"],
   * headers["accept-language"] are defined. It will throw an error if one of the above
   * mentioned properties are not defined.
   */
  validateRequestProperties(): void;

  /**
   * Sets options on the request.
   */
  prepare(options: RequestPrepareOptions): WebResourceLike;
  /**
   * Clone this request object.
   */
  clone(): WebResourceLike;
}

export function isWebResourceLike(object: unknown): object is WebResourceLike {
  if (object && typeof object === "object") {
    const castObject = object as {
      url: unknown;
      method: unknown;
      headers: unknown;
      validateRequestProperties: unknown;
      prepare: unknown;
      clone: unknown;
    };
    if (
      typeof castObject.url === "string" &&
      typeof castObject.method === "string" &&
      typeof castObject.headers === "object" &&
      isHttpHeadersLike(castObject.headers) &&
      typeof castObject.validateRequestProperties === "function" &&
      typeof castObject.prepare === "function" &&
      typeof castObject.clone === "function"
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Creates a new WebResource object.
 *
 * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
 * properties to initiate a request.
 */
export class WebResource implements WebResourceLike {
  /**
   * URL of the outgoing request.
   */
  url: string;
  /**
   * HTTP method to use.
   */
  method: HttpMethods;
  /**
   * Request body.
   */
  body?: any;
  /**
   * HTTP headers.
   */
  headers: HttpHeadersLike;
  /**
   * Whether or not the body of the HttpOperationResponse should be treated as a stream.
   * @deprecated Use streamResponseStatusCodes property instead.
   */
  streamResponseBody?: boolean;
  /**
   * A list of status codes whose corresponding HttpOperationResponse body should be treated as a stream.
   */
  streamResponseStatusCodes?: Set<number>;
  /**
   * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
   * HttpOperationResponse should be deserialized.
   */
  shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
  /**
   * A function that returns the proper OperationResponse for the given OperationSpec and
   * HttpOperationResponse combination. If this is undefined, then a simple status code lookup will
   * be used.
   */
  operationResponseGetter?: (
    operationSpec: OperationSpec,
    response: HttpOperationResponse
  ) => undefined | OperationResponse;
  /**
   * Form data, used to build the request body.
   */
  formData?: any;
  /**
   * Query added to the URL.
   */
  query?: { [key: string]: any };
  /**
   * Specification of the HTTP request.
   */
  operationSpec?: OperationSpec;
  /**
   * Whether to send credentials (via cookies, authorization headers, or TLS client certificates) when making a request in the browser to a cross-site destination.
   */
  withCredentials: boolean;
  /**
   * How long to wait in milliseconds before aborting the request.
   */
  timeout: number;
  /**
   * What proxy to use, if necessary.
   */
  proxySettings?: ProxySettings;
  /**
   * Whether to keep the HTTP connections alive throughout requests.
   */
  keepAlive?: boolean;
  /**
   * Whether or not to decompress response according to Accept-Encoding header (node-fetch only)
   */
  decompressResponse?: boolean;
  /**
   * Unique identifier of the outgoing request.
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

  /**
   * Callback which fires upon download progress.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Tracing: Options used to create a span when tracing is enabled.
   */
  spanOptions?: SpanOptions;

  /**
   * Tracing: Context used when creating Spans.
   */
  tracingContext?: Context;

  constructor(
    url?: string,
    method?: HttpMethods,
    body?: unknown,
    query?: { [key: string]: any },
    headers?: { [key: string]: any } | HttpHeadersLike,
    streamResponseBody?: boolean,
    withCredentials?: boolean,
    abortSignal?: AbortSignalLike,
    timeout?: number,
    onUploadProgress?: (progress: TransferProgressEvent) => void,
    onDownloadProgress?: (progress: TransferProgressEvent) => void,
    proxySettings?: ProxySettings,
    keepAlive?: boolean,
    decompressResponse?: boolean,
    streamResponseStatusCodes?: Set<number>
  ) {
    this.streamResponseBody = streamResponseBody;
    this.streamResponseStatusCodes = streamResponseStatusCodes;
    this.url = url || "";
    this.method = method || "GET";
    this.headers = isHttpHeadersLike(headers) ? headers : new HttpHeaders(headers);
    this.body = body;
    this.query = query;
    this.formData = undefined;
    this.withCredentials = withCredentials || false;
    this.abortSignal = abortSignal;
    this.timeout = timeout || 0;
    this.onUploadProgress = onUploadProgress;
    this.onDownloadProgress = onDownloadProgress;
    this.proxySettings = proxySettings;
    this.keepAlive = keepAlive;
    this.decompressResponse = decompressResponse;
    this.requestId = this.headers.get("x-ms-client-request-id") || generateUuid();
  }

  /**
   * Validates that the required properties such as method, url, headers["Content-Type"],
   * headers["accept-language"] are defined. It will throw an error if one of the above
   * mentioned properties are not defined.
   */
  validateRequestProperties(): void {
    if (!this.method) {
      throw new Error("WebResource.method is required.");
    }
    if (!this.url) {
      throw new Error("WebResource.url is required.");
    }
  }

  /**
   * Prepares the request.
   * @param options - Options to provide for preparing the request.
   * @returns Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
   */
  prepare(options: RequestPrepareOptions): WebResource {
    if (!options) {
      throw new Error("options object is required");
    }

    if (
      options.method === undefined ||
      options.method === null ||
      typeof options.method.valueOf() !== "string"
    ) {
      throw new Error("options.method must be a string.");
    }

    if (options.url && options.pathTemplate) {
      throw new Error(
        "options.url and options.pathTemplate are mutually exclusive. Please provide exactly one of them."
      );
    }

    if (
      (options.pathTemplate === undefined ||
        options.pathTemplate === null ||
        typeof options.pathTemplate.valueOf() !== "string") &&
      (options.url === undefined ||
        options.url === null ||
        typeof options.url.valueOf() !== "string")
    ) {
      throw new Error("Please provide exactly one of options.pathTemplate or options.url.");
    }

    // set the url if it is provided.
    if (options.url) {
      if (typeof options.url !== "string") {
        throw new Error('options.url must be of type "string".');
      }
      this.url = options.url;
    }

    // set the method
    if (options.method) {
      const validMethods = ["GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH", "TRACE"];
      if (validMethods.indexOf(options.method.toUpperCase()) === -1) {
        throw new Error(
          'The provided method "' +
            options.method +
            '" is invalid. Supported HTTP methods are: ' +
            JSON.stringify(validMethods)
        );
      }
    }
    this.method = options.method.toUpperCase() as HttpMethods;

    // construct the url if path template is provided
    if (options.pathTemplate) {
      const { pathTemplate, pathParameters } = options;
      if (typeof pathTemplate !== "string") {
        throw new Error('options.pathTemplate must be of type "string".');
      }
      if (!options.baseUrl) {
        options.baseUrl = "https://management.azure.com";
      }
      const baseUrl = options.baseUrl;
      let url =
        baseUrl +
        (baseUrl.endsWith("/") ? "" : "/") +
        (pathTemplate.startsWith("/") ? pathTemplate.slice(1) : pathTemplate);
      const segments = url.match(/({[\w-]*\s*[\w-]*})/gi);
      if (segments && segments.length) {
        if (!pathParameters) {
          throw new Error(
            `pathTemplate: ${pathTemplate} has been provided. Hence, options.pathParameters must also be provided.`
          );
        }
        segments.forEach(function (item) {
          const pathParamName = item.slice(1, -1);
          const pathParam = (pathParameters as { [key: string]: any })[pathParamName];
          if (
            pathParam === null ||
            pathParam === undefined ||
            !(typeof pathParam === "string" || typeof pathParam === "object")
          ) {
            const stringifiedPathParameters = JSON.stringify(pathParameters, undefined, 2);
            throw new Error(
              `pathTemplate: ${pathTemplate} contains the path parameter ${pathParamName}` +
                ` however, it is not present in parameters: ${stringifiedPathParameters}.` +
                `The value of the path parameter can either be a "string" of the form { ${pathParamName}: "some sample value" } or ` +
                `it can be an "object" of the form { "${pathParamName}": { value: "some sample value", skipUrlEncoding: true } }.`
            );
          }

          if (typeof pathParam.valueOf() === "string") {
            url = url.replace(item, encodeURIComponent(pathParam));
          }

          if (typeof pathParam.valueOf() === "object") {
            if (!pathParam.value) {
              throw new Error(
                `options.pathParameters[${pathParamName}] is of type "object" but it does not contain a "value" property.`
              );
            }
            if (pathParam.skipUrlEncoding) {
              url = url.replace(item, pathParam.value);
            } else {
              url = url.replace(item, encodeURIComponent(pathParam.value));
            }
          }
        });
      }
      this.url = url;
    }

    // append query parameters to the url if they are provided. They can be provided with pathTemplate or url option.
    if (options.queryParameters) {
      const queryParameters = options.queryParameters;
      if (typeof queryParameters !== "object") {
        throw new Error(
          `options.queryParameters must be of type object. It should be a JSON object ` +
            `of "query-parameter-name" as the key and the "query-parameter-value" as the value. ` +
            `The "query-parameter-value" may be fo type "string" or an "object" of the form { value: "query-parameter-value", skipUrlEncoding: true }.`
        );
      }
      // append question mark if it is not present in the url
      if (this.url && this.url.indexOf("?") === -1) {
        this.url += "?";
      }
      // construct queryString
      const queryParams = [];
      // We need to populate this.query as a dictionary if the request is being used for Sway's validateRequest().
      this.query = {};
      for (const queryParamName in queryParameters) {
        const queryParam: any = queryParameters[queryParamName];
        if (queryParam) {
          if (typeof queryParam === "string") {
            queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam));
            this.query[queryParamName] = encodeURIComponent(queryParam);
          } else if (typeof queryParam === "object") {
            if (!queryParam.value) {
              throw new Error(
                `options.queryParameters[${queryParamName}] is of type "object" but it does not contain a "value" property.`
              );
            }
            if (queryParam.skipUrlEncoding) {
              queryParams.push(queryParamName + "=" + queryParam.value);
              this.query[queryParamName] = queryParam.value;
            } else {
              queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam.value));
              this.query[queryParamName] = encodeURIComponent(queryParam.value);
            }
          }
        }
      } // end-of-for
      // append the queryString
      this.url += queryParams.join("&");
    }

    // add headers to the request if they are provided
    if (options.headers) {
      const headers = options.headers;
      for (const headerName of Object.keys(options.headers)) {
        this.headers.set(headerName, headers[headerName]);
      }
    }
    // ensure accept-language is set correctly
    if (!this.headers.get("accept-language")) {
      this.headers.set("accept-language", "en-US");
    }
    // ensure the request-id is set correctly
    if (!this.headers.get("x-ms-client-request-id") && !options.disableClientRequestId) {
      this.headers.set("x-ms-client-request-id", this.requestId);
    }

    // default
    if (!this.headers.get("Content-Type")) {
      this.headers.set("Content-Type", "application/json; charset=utf-8");
    }

    // set the request body. request.js automatically sets the Content-Length request header, so we need not set it explicitly
    this.body = options.body;
    if (options.body !== undefined && options.body !== null) {
      // body as a stream special case. set the body as-is and check for some special request headers specific to sending a stream.
      if (options.bodyIsStream) {
        if (!this.headers.get("Transfer-Encoding")) {
          this.headers.set("Transfer-Encoding", "chunked");
        }
        if (this.headers.get("Content-Type") !== "application/octet-stream") {
          this.headers.set("Content-Type", "application/octet-stream");
        }
      } else {
        if (options.serializationMapper) {
          this.body = new Serializer(options.mappers).serialize(
            options.serializationMapper,
            options.body,
            "requestBody"
          );
        }
        if (!options.disableJsonStringifyOnBody) {
          this.body = JSON.stringify(options.body);
        }
      }
    }

    if (options.spanOptions) {
      this.spanOptions = options.spanOptions;
    }

    if (options.tracingContext) {
      this.tracingContext = options.tracingContext;
    }

    this.abortSignal = options.abortSignal;
    this.onDownloadProgress = options.onDownloadProgress;
    this.onUploadProgress = options.onUploadProgress;

    return this;
  }

  /**
   * Clone this WebResource HTTP request object.
   * @returns The clone of this WebResource HTTP request object.
   */
  clone(): WebResource {
    const result = new WebResource(
      this.url,
      this.method,
      this.body,
      this.query,
      this.headers && this.headers.clone(),
      this.streamResponseBody,
      this.withCredentials,
      this.abortSignal,
      this.timeout,
      this.onUploadProgress,
      this.onDownloadProgress,
      this.proxySettings,
      this.keepAlive,
      this.decompressResponse,
      this.streamResponseStatusCodes
    );

    if (this.formData) {
      result.formData = this.formData;
    }

    if (this.operationSpec) {
      result.operationSpec = this.operationSpec;
    }

    if (this.shouldDeserialize) {
      result.shouldDeserialize = this.shouldDeserialize;
    }

    if (this.operationResponseGetter) {
      result.operationResponseGetter = this.operationResponseGetter;
    }

    return result;
  }
}

/**
 * Options to prepare an outgoing HTTP request.
 */
export interface RequestPrepareOptions {
  /**
   * The HTTP request method. Valid values are "GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST",
   * or "PATCH".
   */
  method: HttpMethods;
  /**
   * The request url. It may or may not have query parameters in it. Either provide the "url" or
   * provide the "pathTemplate" in the options object. Both the options are mutually exclusive.
   */
  url?: string;
  /**
   * A dictionary of query parameters to be appended to the url, where
   * the "key" is the "query-parameter-name" and the "value" is the "query-parameter-value".
   * The "query-parameter-value" can be of type "string" or it can be of type "object".
   * The "object" format should be used when you want to skip url encoding. While using the object format,
   * the object must have a property named value which provides the "query-parameter-value".
   * Example:
   *    - query-parameter-value in "object" format: `{ "query-parameter-name": { value: "query-parameter-value", skipUrlEncoding: true } }`
   *    - query-parameter-value in "string" format: `{ "query-parameter-name": "query-parameter-value"}`.
   * Note: "If options.url already has some query parameters, then the value provided in options.queryParameters will be appended to the url.
   */
  queryParameters?: { [key: string]: any | ParameterValue };
  /**
   * The path template of the request url. Either provide the "url" or provide the "pathTemplate" in
   * the options object. Both the options are mutually exclusive.
   * Example: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}`
   */
  pathTemplate?: string;
  /**
   * The base url of the request. Default value is: "https://management.azure.com". This is
   * applicable only with pathTemplate. If you are providing options.url then it is expected that
   * you provide the complete url.
   */
  baseUrl?: string;
  /**
   * A dictionary of path parameters that need to be replaced with actual values in the pathTemplate.
   * Here the key is the "path-parameter-name" and the value is the "path-parameter-value".
   * The "path-parameter-value" can be of type "string"  or it can be of type "object".
   * The "object" format should be used when you want to skip url encoding. While using the object format,
   * the object must have a property named value which provides the "path-parameter-value".
   * Example:
   *    - path-parameter-value in "object" format: `{ "path-parameter-name": { value: "path-parameter-value", skipUrlEncoding: true } }`
   *    - path-parameter-value in "string" format: `{ "path-parameter-name": "path-parameter-value" }`.
   */
  pathParameters?: { [key: string]: any | ParameterValue };
  /**
   * Form data, used to build the request body.
   */
  formData?: { [key: string]: any };
  /**
   * A dictionary of request headers that need to be applied to the request.
   * Here the key is the "header-name" and the value is the "header-value". The header-value MUST be of type string.
   *  - ContentType must be provided with the key name as "Content-Type". Default value "application/json; charset=utf-8".
   *  - "Transfer-Encoding" is set to "chunked" by default if "options.bodyIsStream" is set to true.
   *  - "Content-Type" is set to "application/octet-stream" by default if "options.bodyIsStream" is set to true.
   *  - "accept-language" by default is set to "en-US"
   *  - "x-ms-client-request-id" by default is set to a new Guid. To not generate a guid for the request, please set options.disableClientRequestId to true
   */
  headers?: { [key: string]: any };
  /**
   * When set to true, instructs the client to not set "x-ms-client-request-id" header to a new Guid().
   */
  disableClientRequestId?: boolean;
  /**
   * The request body. It can be of any type. This value will be serialized if it is not a stream.
   */
  body?: any;
  /**
   * Provides information on how to serialize the request body.
   */
  serializationMapper?: Mapper;
  /**
   * A dictionary of mappers that may be used while [de]serialization.
   */
  mappers?: { [x: string]: any };
  /**
   * Provides information on how to deserialize the response body.
   */
  deserializationMapper?: Record<string, unknown>;
  /**
   * Indicates whether this method should JSON.stringify() the request body. Default value: false.
   */
  disableJsonStringifyOnBody?: boolean;
  /**
   * Indicates whether the request body is a stream (useful for file upload scenarios).
   */
  bodyIsStream?: boolean;
  /**
   * Signal of an abort controller. Can be used to abort both sending a network request and waiting for a response.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Allows keeping track of the progress of uploading the outgoing request.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Allows keeping track of the progress of downloading the incoming response.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Tracing: Options used to create a span when tracing is enabled.
   */
  spanOptions?: SpanOptions;
  /**
   * Tracing: Context used when creating spans.
   */
  tracingContext?: Context;
}

/**
 * The Parameter value provided for path or query parameters in RequestPrepareOptions
 */
export interface ParameterValue {
  /**
   * Value of the parameter.
   */
  value: any;
  /**
   * Disables URL encoding if set to true.
   */
  skipUrlEncoding: boolean;
  /**
   * Parameter values may contain any other property.
   */
  [key: string]: any;
}

/**
 * Describes the base structure of the options object that will be used in every operation.
 */
export interface RequestOptionsBase {
  /**
   * will be applied before the request is sent.
   */
  customHeaders?: { [key: string]: string };

  /**
   * Signal of an abort controller. Can be used to abort both sending a network request and waiting for a response.
   */
  abortSignal?: AbortSignalLike;

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   * If the request is terminated, an `AbortError` is thrown.
   */
  timeout?: number;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Callback which fires upon download progress.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
   * HttpOperationResponse should be deserialized.
   */
  shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);

  /**
   * Tracing: Context used when creating spans.
   */
  tracingContext?: Context;

  /**
   * May contain other properties.
   */
  [key: string]: any;

  /**
   * Options to override XML parsing/building behavior.
   */
  serializerOptions?: SerializerOptions;
}
