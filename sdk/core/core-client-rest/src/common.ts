// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Pipeline,
  PipelineOptions,
  PipelineRequest,
  RawHttpHeaders,
} from "@azure/core-rest-pipeline";
import { RequestParameters } from "./pathClientTypes";

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
 * Http Response which body is a NodeJS stream object
 */
export type HttpNodeStreamResponse = HttpResponse & {
  /**
   * Streamable body
   */
  body: NodeJS.ReadableStream;
};

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
    ...args: RouteParams<TPath>
  ) => ClientResource<StreamableMethod>;
}

/**
 * An object that defines a then property that can takes a
 * callback for the resolution and can be awaited
 */
export interface Thenable<TResult> {
  /**
   * Attaches callbacks for the resolution of the thenable.
   */
  then: (onFulfilled: (p: TResult) => TResult) => Promise<TResult>;
}

/**
 * Type to use with pathUnchecked, overrides the body type to any to allow flexibility
 */
export type PathUncheckedResponse = HttpResponse & { body: any };

/**
 * Defines a REST resoruce and the methods that can be called on it
 */
export interface ClientResource<TResponse = Thenable<PathUncheckedResponse>> {
  /**
   * GET method for a REST resource
   */
  get: (options?: RequestParameters) => TResponse;
  /**
   * POST method for a REST resource
   */
  post: (options?: RequestParameters) => TResponse;
  /**
   * PUT method for a REST resource
   */
  put: (options?: RequestParameters) => TResponse;
  /**
   * PATCH method for a REST resource
   */
  patch: (options?: RequestParameters) => TResponse;
  /**
   * DELETE method for a REST resource
   */
  delete: (options?: RequestParameters) => TResponse;
  /**
   * HEAD method for a REST resource
   */
  head: (options?: RequestParameters) => TResponse;
  /**
   * OPTIONS method for a REST resource
   */
  options: (options?: RequestParameters) => TResponse;
  /**
   * TRACE method for a REST resource
   */
  trace: (options?: RequestParameters) => TResponse;
}

/**
 * Defines the type for a method that supports getting the response body as
 * a raw stream
 */
export type StreamableMethod = Thenable<PathUncheckedResponse> & {
  asNodeStream: () => Promise<HttpNodeStreamResponse>;
};

/**
 * Helper type used to detect parameters in a path template
 * keys surounded by \{\} will be considered a path parameter
 */
export type RouteParams<
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
    [pathParam: string | number | boolean, ...pathParams: RouteParams<Tail>]
  : // When the path doesn't match the template, it means that we have no path parameters so we return
    // an empty tuple.
    [];
