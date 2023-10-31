// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  RawHttpHeaders,
  RequestBodyType,
  TransferProgressEvent,
  RawHttpHeadersInput,
} from "../interfaces";
import { Pipeline, PipelinePolicy } from "../pipeline";
import { AbortSignalLike } from "../abort-controller/AbortSignalLike";
import { OperationTracingOptions } from "../tracing/interfaces";
import { PipelineOptions } from "../createPipelineFromOptions";
import { LogPolicyOptions } from "../policies/logPolicy";

/**
 * Shape of the default request parameters, this may be overriden by the specific
 * request types to provide strong types
 */
export type RequestParameters = {
  /**
   * Headers to send along with the request
   */
  headers?: RawHttpHeadersInput;
  /**
   * Sets the accept header to send to the service
   * defaults to 'application/json'. If also a header "accept" is set
   * this property will take precedence.
   */
  accept?: string;
  /**
   * Body to send with the request
   */
  body?: unknown;
  /**
   * Query parameters to send with the request
   */
  queryParameters?: Record<string, unknown>;
  /**
   * Set an explicit content-type to send with the request. If also a header "content-type" is set
   * this property will take precedence.
   */
  contentType?: string;
  /** Set to true if the request is sent over HTTP instead of HTTPS */
  allowInsecureConnection?: boolean;
  /** Set to true if you want to skip encoding the path parameters */
  skipUrlEncoding?: boolean;
  /**
   * Path parameters for custom the base url
   */
  pathParameters?: Record<string, any>;

  /**
   * The number of milliseconds a request can take before automatically being terminated.
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
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Options used when tracing is enabled.
   */
  tracingOptions?: OperationTracingOptions;

  /**
   * A function to be called each time a response is received from the server
   * while performing the requested operation.
   * May be called multiple times.
   */
  onResponse?: RawResponseCallback;
};

/**
 * A function to be called each time a response is received from the server
 * while performing the requested operation.
 * May be called multiple times.
 */
export type RawResponseCallback = (rawResponse: FullOperationResponse, error?: unknown) => void;

/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `parsedBody` property when the response body is received in JSON.
 */
export interface FullOperationResponse extends PipelineResponse {
  /**
   * The raw HTTP response headers.
   */
  rawHeaders?: RawHttpHeaders;

  /**
   * The response body as parsed JSON.
   */
  parsedBody?: RequestBodyType;

  /**
   * The request that generated the response.
   */
  request: PipelineRequest;
}

/**
 * The base options type for all operations.
 */
export interface OperationOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Options used when creating and sending HTTP requests for this operation.
   */
  requestOptions?: OperationRequestOptions;
  /**
   * Options used when tracing is enabled.
   */
  tracingOptions?: OperationTracingOptions;

  /**
   * A function to be called each time a response is received from the server
   * while performing the requested operation.
   * May be called multiple times.
   */
  onResponse?: RawResponseCallback;
}

/**
 * Options used when creating and sending HTTP requests for this operation.
 */
export interface OperationRequestOptions {
  /**
   * User defined custom request headers that
   * will be applied before the request is sent.
   */
  headers?: RawHttpHeadersInput;

  /**
   * The number of milliseconds a request can take before automatically being terminated.
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
   * Set to true if the request is sent over HTTP instead of HTTPS
   */
  allowInsecureConnection?: boolean;

  /**
   * Set to true if you want to skip encoding the path parameters
   */
  skipUrlEncoding?: boolean;
}

/**
 * Type to use with pathUnchecked, overrides the body type to any to allow flexibility
 */
export type PathUncheckedResponse = HttpResponse & { body: any };

/**
 * Shape of a Rest Level Client
 */
export interface Client {
  /**
   * The pipeline used by this client to make requests
   */
  pipeline: Pipeline;
  /**
   * This method will be used to send request that would check the path to provide
   * strong types. When used by the codegen this type gets overriden wit the generated
   * types. For example:
   * ```typescript
   * export type MyClient = Client & {
   *    path: Routes;
   * }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  path: Function;
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: PathUnchecked;
}

/**
 * Http Response which body is a NodeJS stream object
 */
export type HttpNodeStreamResponse = HttpResponse & {
  /**
   * Streamable body
   */
  body?: NodeJS.ReadableStream;
};

/**
 * Http Response which body is a NodeJS stream object
 */
export type HttpBrowserStreamResponse = HttpResponse & {
  /**
   * Streamable body
   */
  body?: ReadableStream<Uint8Array>;
};

/**
 * Defines the type for a method that supports getting the response body as
 * a raw stream
 */
export type StreamableMethod<TResponse = PathUncheckedResponse> = PromiseLike<TResponse> & {
  asNodeStream: () => Promise<HttpNodeStreamResponse>;
  asBrowserStream: () => Promise<HttpBrowserStreamResponse>;
};

/**
 * Defines the signature for pathUnchecked.
 */
export type PathUnchecked = <TPath extends string>(
  path: TPath,
  ...args: PathParameters<TPath>
) => ResourceMethods<StreamableMethod>;

/**
 * Defines the methods that can be called on a resource
 */
export interface ResourceMethods<TResponse = PromiseLike<PathUncheckedResponse>> {
  /**
   * Definition of the GET HTTP method for a resource
   */
  get: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the POST HTTP method for a resource
   */
  post: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the PUT HTTP method for a resource
   */
  put: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the PATCH HTTP method for a resource
   */
  patch: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the DELETE HTTP method for a resource
   */
  delete: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the HEAD HTTP method for a resource
   */
  head: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the OPTIONS HTTP method for a resource
   */
  options: (options?: RequestParameters) => TResponse;
  /**
   * Definition of the TRACE HTTP method for a resource
   */
  trace: (options?: RequestParameters) => TResponse;
}

/**
 * Used to configure additional policies added to the pipeline at construction.
 */
export interface AdditionalPolicyConfig {
  /**
   * A policy to be added.
   */
  policy: PipelinePolicy;
  /**
   * Determines if this policy be applied before or after retry logic.
   * Only use `perRetry` if you need to modify the request again
   * each time the operation is retried due to retryable service
   * issues.
   */
  position: "perCall" | "perRetry";
}

/**
 * General options that a Rest Level Client can take
 */
export type ClientOptions = PipelineOptions & {
  /**
   * Credentials information
   */
  credentials?: {
    /**
     * Authentication scopes for AAD
     */
    scopes?: string[];
    /**
     * Heder name for Client Secret authentication
     */
    apiKeyHeaderName?: string;
  };
  /**
   * Base url for the client
   */
  baseUrl?: string;
  /**
   * Options for setting a custom apiVersion.
   */
  apiVersion?: string;
  /**
   * Option to allow calling http (insecure) endpoints
   */
  allowInsecureConnection?: boolean;
  /**
   * Additional policies to include in the HTTP pipeline.
   */
  additionalPolicies?: AdditionalPolicyConfig[];
  /**
   * Specify a custom HttpClient when making requests.
   */
  httpClient?: HttpClient;
  /**
   * Options to configure request/response logging.
   */
  loggingOptions?: LogPolicyOptions;
};

/**
 * Represents the shape of an HttpResponse
 */
export type HttpResponse = {
  /**
   * The request that generated this response.
   */
  request: PipelineRequest;
  /**
   * The HTTP response headers.
   */
  headers: RawHttpHeaders;
  /**
   * Parsed body
   */
  body: unknown;
  /**
   * The HTTP status code of the response.
   */
  status: string;
};

/**
 * Helper type used to detect parameters in a path template
 * text surrounded by \{\} will be considered a path parameter
 */
export type PathParameters<
  TRoute extends string
  // This is trying to match the string in TRoute with a template where HEAD/{PARAM}/TAIL
  // for example in the followint path: /foo/{fooId}/bar/{barId}/baz the template will infer
  // HEAD: /foo
  // Param: fooId
  // Tail: /bar/{barId}/baz
  // The above sample path would return [pathParam: string, pathParam: string]
> = TRoute extends `${infer _Head}/{${infer _Param}}${infer Tail}`
  ? // In case we have a match for the template above we know for sure
    // that we have at least one pathParameter, that's why we set the first pathParam
    // in the tuple. At this point we have only matched up until param, if we want to identify
    // additional parameters we can call RouteParameters recursively on the Tail to match the remaining parts,
    // in case the Tail has more parameters, it will return a tuple with the parameters found in tail.
    // We spread the second path params to end up with a single dimension tuple at the end.
    [pathParameter: string, ...pathParameters: PathParameters<Tail>]
  : // When the path doesn't match the template, it means that we have no path parameters so we return
    // an empty tuple.
    [];

/** A response containing error details. */
export interface ErrorResponse {
  /** The error object. */
  error: ErrorModel;
}

/** The error object. */
export interface ErrorModel {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details: Array<ErrorModel>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerError;
}

/** An object containing more specific information about the error. As per Microsoft One API guidelines - https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses. */
export interface InnerError {
  /** One of a server-defined set of error codes. */
  code: string;
  /** Inner error. */
  innererror?: InnerError;
}
