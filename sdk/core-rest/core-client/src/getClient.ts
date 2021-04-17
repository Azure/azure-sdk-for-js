// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { HttpMethods, Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import { ClientOptions, HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { sendRequest } from "./sendRequest";
import { buildRequestUrl } from "./urlHelpers";

/**
 * Type to use with pathUnchecked, overrides the body type to any to allow flexibility
 */
export type PathUncheckedResponse = HttpResponse & { body: any };

/**
 * Shape of a Rest Level Client
 */
export interface Client {
  /**
   * This method will be used to send request that would check the path to provide
   * strong types
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  path: Function;
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: (
    path: string,
    ...args: Array<any>
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
 * Creates a client with a default pipeline
 * @param baseUrl - Base endpoint for the client
 * @param options - Client options
 */
export function getClient(baseUrl: string, options?: PipelineOptions): Client;
/**
 * Creates a client with a default pipeline
 * @param baseUrl - Base endpoint for the client
 * @param credentials - Credentials to authenticate the requests
 * @param options - Client options
 */
export function getClient(
  baseUrl: string,
  credentials?: TokenCredential | KeyCredential,
  options?: ClientOptions
): Client;
export function getClient(
  baseUrl: string,
  credentialsOrPipelineOptions?: (TokenCredential | KeyCredential) | ClientOptions,
  clientOptions: ClientOptions = {}
): Client {
  let credentials: TokenCredential | KeyCredential | undefined;

  if (credentialsOrPipelineOptions) {
    if (isCredential(credentialsOrPipelineOptions)) {
      credentials = credentialsOrPipelineOptions;
    } else {
      clientOptions = credentialsOrPipelineOptions ?? {};
    }
  }

  const pipeline = createDefaultPipeline(baseUrl, credentials, clientOptions);
  const client = (path: string, ...args: Array<any>) => {
    return {
      get: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("GET", clientOptions, baseUrl, path, pipeline, options, args);
      },
      post: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("POST", clientOptions, baseUrl, path, pipeline, options, args);
      },
      put: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("PUT", clientOptions, baseUrl, path, pipeline, options, args);
      },
      patch: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("PATCH", clientOptions, baseUrl, path, pipeline, options, args);
      },
      delete: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("DELETE", clientOptions, baseUrl, path, pipeline, options, args);
      },
      head: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("HEAD", clientOptions, baseUrl, path, pipeline, options, args);
      },
      options: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("OPTIONS", clientOptions, baseUrl, path, pipeline, options, args);
      },
      trace: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest("TRACE", clientOptions, baseUrl, path, pipeline, options, args);
      },
    };
  };

  return {
    path: client,
    pathUnchecked: client,
  };
}

function buildSendRequest(
  method: HttpMethods,
  clientOptions: ClientOptions,
  baseUrl: string,
  path: string,
  pipeline: Pipeline,
  requestOptions: RequestParameters = {},
  args: string[] = []
): Promise<HttpResponse> {
  // If the client has an api-version and the request doesn't specify one, inject the one in the client options
  if (!requestOptions.queryParameters?.["api-version"] && clientOptions.apiVersion) {
    if (!requestOptions.queryParameters) {
      requestOptions.queryParameters = {};
    }

    requestOptions.queryParameters["api-version"] = clientOptions.apiVersion;
  }

  const url = buildRequestUrl(baseUrl, path, args, requestOptions);
  return sendRequest(method, url, pipeline, requestOptions);
}

function isCredential(
  param: (TokenCredential | KeyCredential) | PipelineOptions
): param is TokenCredential | KeyCredential {
  if ((param as KeyCredential).key !== undefined || isTokenCredential(param)) {
    return true;
  }

  return false;
}
