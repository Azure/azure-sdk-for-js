// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { isCertificateCredential } from "./certificateCredential";
import { HttpClient, HttpMethods, Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import {
  Client,
  ClientOptions,
  HttpBrowserStreamResponse,
  HttpNodeStreamResponse,
  RequestParameters,
  StreamableMethod,
} from "./common";
import { sendRequest, sendRequestAsStream } from "./sendRequest";
import { buildRequestUrl } from "./urlHelpers";

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
  const client = (path: string, ...args: Array<any>) => {
    const getUrl = (requestOptions: RequestParameters) =>
      buildRequestUrl(baseUrl, path, args, { allowInsecureConnection, ...requestOptions });

    return {
      get: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "GET",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      post: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "POST",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      put: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "PUT",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      patch: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "PATCH",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      delete: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "DELETE",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      head: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "HEAD",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      options: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "OPTIONS",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
        );
      },
      trace: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "TRACE",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient
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
  pipeline: Pipeline,
  options: RequestParameters,
  allowInsecureConnection?: boolean,
  httpClient?: HttpClient
): StreamableMethod {
  return {
    then: function (onFulfilled, onrejected) {
      return sendRequest(
        method,
        url,
        pipeline,
        { allowInsecureConnection, ...options },
        httpClient
      ).then(onFulfilled, onrejected);
    },
    async asBrowserStream() {
      return sendRequestAsStream<HttpBrowserStreamResponse>(
        method,
        url,
        pipeline,
        { allowInsecureConnection, ...options },
        httpClient
      );
    },
    async asNodeStream() {
      return sendRequestAsStream<HttpNodeStreamResponse>(
        method,
        url,
        pipeline,
        { allowInsecureConnection, ...options },
        httpClient
      );
    },
  };
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
