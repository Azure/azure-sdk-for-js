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
  pathUnchecked: (path: string, ...args: Array<any>) => ClientResource;
}

export interface Thenable<TResult> {
  then: (onFulfilled: (p: TResult) => TResult) => Promise<TResult>;
}

/**
 * Type to use with pathUnchecked, overrides the body type to any to allow flexibility
 */
export type PathUncheckedResponse = HttpResponse & { body: any };

export interface ClientResource<TResponse = Thenable<PathUncheckedResponse>> {
  get: (options?: RequestParameters) => TResponse;
  post: (options?: RequestParameters) => TResponse;
  put: (options?: RequestParameters) => TResponse;
  patch: (options?: RequestParameters) => TResponse;
  delete: (options?: RequestParameters) => TResponse;
  head: (options?: RequestParameters) => TResponse;
  options: (options?: RequestParameters) => TResponse;
  trace: (options?: RequestParameters) => TResponse;
}

export type MethodwithAsStream = Thenable<PathUncheckedResponse> & {
  asNodeStream: () => Promise<HttpNodeStreamResponse>;
};
