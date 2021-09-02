// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
   * defaults to 'application/json'
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
   * Set an explicit content-type to send with the request
   */
  contentType?: string;
  /** Set to true if the request is sent over HTTP instead of HTTPS */
  allowInsecureConnection?: boolean;
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
    [pathParam: string, ...pathParams: RouteParams<Tail>]
  : // When the path doesn't match the template, it means that we have no path parameters so we return
    // an empty tuple.
    [];
