// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";

/**
 * Shape of the default request parameters, this may be overriden by the specific
 * request types to provide strong types
 */
export type RequestParameters = {
  /**
   * Headers to send along with the request
   */
  headers?: RawHttpHeaders;
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
> = TRoute extends `${infer _Head}/{${infer _Param}}${infer Tail}`
  ? [pathParam: string, ...pathParams: RouteParams<Tail>]
  : [];
