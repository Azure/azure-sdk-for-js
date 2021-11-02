// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Pipeline,
  PipelineOptions,
  PipelineRequest,
  RawHttpHeaders,
} from "@azure/core-rest-pipeline";
import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";

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
};

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
   * strong types
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  path: Function;
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: <TPath extends string>(
    path: TPath,
    ...args: PathParameters<TPath>
  ) => {
    get: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    post: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    put: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    patch: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    delete: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    head: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    options: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    trace: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
  };
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
 * keys surounded by \{\} will be considered a path parameter
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
