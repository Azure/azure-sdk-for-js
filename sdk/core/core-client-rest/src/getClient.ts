// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { HttpClient, HttpMethods, Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers.js";
import {
  Client,
  ClientOptions,
  HttpBrowserStreamResponse,
  HttpNodeStreamResponse,
  RequestParameters,
  StreamableMethod,
} from "./common.js";
import { sendRequest } from "./sendRequest.js";
import { buildRequestUrl } from "./urlHelpers.js";

// type TracerCallback = (
//   routePath: string,
//   url: string,
//   args: RequestParameters,
//   methodToTrace: () => StreamableMethod,
// ) => StreamableMethod;

/**
 * Creates a client with a default pipeline
 * @param endpoint - Base endpoint for the client
 * @param options - Client options
 */
export function getClient(endpoint: string, options?: ClientOptions): Client;
/**
 * Creates a client with a default pipeline
 * @param endpoint - Base endpoint for the client
 * @param credentials - Credentials to authenticate the requests
 * @param options - Client options
 * @param tracer - wrapper method around operations for telemetry
 */
export function getClient(
  endpoint: string,
  credentials?: TokenCredential | KeyCredential,
  options?: ClientOptions,
): Client;
export function getClient(
  endpoint: string,
  credentialsOrPipelineOptions?: (TokenCredential | KeyCredential) | ClientOptions,
  clientOptions: ClientOptions = {},
): Client {
  let credentials: TokenCredential | KeyCredential | undefined;
  if (credentialsOrPipelineOptions) {
    if (isCredential(credentialsOrPipelineOptions)) {
      credentials = credentialsOrPipelineOptions;
    } else {
      clientOptions = credentialsOrPipelineOptions ?? {};
    }
  }

  const pipeline = createDefaultPipeline(endpoint, credentials, clientOptions);
  if (clientOptions.additionalPolicies?.length) {
    for (const { policy, position } of clientOptions.additionalPolicies) {
      // Sign happens after Retry and is commonly needed to occur
      // before policies that intercept post-retry.
      const afterPhase = position === "perRetry" ? "Sign" : undefined;
      pipeline.addPolicy(policy, {
        afterPhase,
      });
    }
  }

  const { allowInsecureConnection, httpClient } = clientOptions;
  const endpointUrl = clientOptions.endpoint ?? endpoint;
  const client = (path: string, ...args: Array<any>) => {
    const getUrl = (requestOptions: RequestParameters) =>
      buildRequestUrl(endpointUrl, path, args, { allowInsecureConnection, ...requestOptions });
    return {
      get: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "GET",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      post: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "POST",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      put: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "PUT",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      patch: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "PATCH",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      delete: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "DELETE",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      head: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "HEAD",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      options: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "OPTIONS",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
        );
      },
      trace: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "TRACE",
          getUrl(requestOptions),
          path,
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
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

function buildOperation(
  method: HttpMethods,
  url: string,
  path: string,
  pipeline: Pipeline,
  options: RequestParameters,
  allowInsecureConnection?: boolean,
  httpClient?: HttpClient,
): StreamableMethod {
  allowInsecureConnection = options.allowInsecureConnection ?? allowInsecureConnection;

  const operation: () => StreamableMethod = () => ({
    then: function (onFulfilled, onrejected) {
      return sendRequest(
        method,
        url,
        pipeline,
        { ...options, allowInsecureConnection },
        httpClient,
      ).then(onFulfilled, onrejected);
    },
    async asBrowserStream() {
      return sendRequest(
        method,
        url,
        pipeline,
        { ...options, allowInsecureConnection, responseAsStream: true },
        httpClient,
      ) as Promise<HttpBrowserStreamResponse>;
    },
    async asNodeStream() {
      return sendRequest(
        method,
        url,
        pipeline,
        { ...options, allowInsecureConnection, responseAsStream: true },
        httpClient,
      ) as Promise<HttpNodeStreamResponse>;
    },
  });

  options = {
    ...options,
    tracingOptions: { tracingContext: options.tracingOptions?.tracingContext },
  };
  return operation();
}

function isCredential(
  param: (TokenCredential | KeyCredential) | PipelineOptions,
): param is TokenCredential | KeyCredential {
  if ((param as KeyCredential).key !== undefined || isTokenCredential(param)) {
    return true;
  }

  return false;
}
