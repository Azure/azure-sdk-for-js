// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { isCertificateCredential } from "./certificateCredential";
import { HttpMethods, Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import { ClientOptions, HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { sendRequest } from "./sendRequest";
import { buildRequestUrl } from "./urlHelpers";

export interface Thenable<TResult> {
  then: (onFulfilled: (p: TResult) => TResult) => Promise<TResult>;
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
   * strong types
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  path: Function;
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: (path: string, ...args: Array<any>) => ClientResource;
}

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
  asStream: () => Promise<NodeJS.ReadableStream | ReadableStream>;
};

/**
 * Shape of a Rest Level Client
 */
export interface ClientWithAsStream extends Client {
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: (path: string, ...args: Array<any>) => ClientResource<MethodwithAsStream>;
}

/**
 * Creates a client with a default pipeline
 * @param baseUrl - Base endpoint for the client
 * @param options - Client options
 */
export function getClient(baseUrl: string, options?: ClientOptions): Client;
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
  const { allowInsecureConnection } = clientOptions;
  const client = (path: string, ...args: Array<any>) => {
    return {
      get: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "GET",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      post: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "POST",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      put: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "PUT",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      patch: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "PATCH",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      delete: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "DELETE",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      head: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "HEAD",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      options: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "OPTIONS",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
      trace: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "TRACE",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options },
          args
        );
      },
    };
  };

  return {
    path: client,
    pathUnchecked: client,
    pipeline,
  };
}

/**
 * Creates a client with a default pipeline
 * @param baseUrl - Base endpoint for the client
 * @param options - Client options
 */
export function getClientWithStream(baseUrl: string, options?: ClientOptions): ClientWithAsStream;
/**
 * Creates a client with a default pipeline
 * @param baseUrl - Base endpoint for the client
 * @param credentials - Credentials to authenticate the requests
 * @param options - Client options
 */
export function getClientWithStream(
  baseUrl: string,
  credentials?: TokenCredential | KeyCredential,
  options?: ClientOptions
): ClientWithAsStream;
export function getClientWithStream(
  baseUrl: string,
  credentialsOrPipelineOptions?: (TokenCredential | KeyCredential) | ClientOptions,
  clientOptions: ClientOptions = {}
): ClientWithAsStream {
  let credentials: TokenCredential | KeyCredential | undefined;
  if (credentialsOrPipelineOptions) {
    if (isCredential(credentialsOrPipelineOptions)) {
      credentials = credentialsOrPipelineOptions;
    } else {
      clientOptions = credentialsOrPipelineOptions ?? {};
    }
  }

  const pipeline = createDefaultPipeline(baseUrl, credentials, clientOptions);
  const { allowInsecureConnection } = clientOptions;

  const resourceWithAsStream = (
    path: string,
    ...args: Array<any>
  ): ClientResource<MethodwithAsStream> => ({
    get(options: RequestParameters = {}) {
      return {
        then: async function (
          onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse
        ): Promise<PathUncheckedResponse> {
          const result: PathUncheckedResponse = await buildSendRequest(
            "GET",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    post(options: RequestParameters = {}) {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "POST",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    put: (options: RequestParameters = {}) => {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "PUT",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    patch: (options: RequestParameters = {}) => {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "PATCH",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    delete: (options: RequestParameters = {}) => {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "DELETE",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    head: (options: RequestParameters = {}) => {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "HEAD",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    options: (options: RequestParameters = {}) => {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "OPTIONS",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
    trace: (options: RequestParameters = {}) => {
      return {
        then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
          const result = await buildSendRequest(
            "TRACE",
            clientOptions,
            baseUrl,
            path,
            pipeline,
            { allowInsecureConnection, ...options },
            args
          );
          return onfulfilled(result);
        },
        async asStream() {
          throw new Error("NYI");
        },
      };
    },
  });

  return {
    path: () => ({} as any),
    pathUnchecked: resourceWithAsStream,
    pipeline,
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
  if (
    (param as KeyCredential).key !== undefined ||
    isTokenCredential(param) ||
    isCertificateCredential(param)
  ) {
    return true;
  }

  return false;
}
