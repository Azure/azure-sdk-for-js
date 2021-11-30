// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { isCertificateCredential } from "./certificateCredential";
import { HttpMethods, Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import { Client, ClientOptions, HttpResponse, RequestParameters } from "./common";
import { sendRequest } from "./sendRequest";
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
  const { allowInsecureConnection } = clientOptions;
  const client = (path: string, ...args: Array<any>) => {
    return {
      get: (options: RequestParameters = {}): Promise<HttpResponse> => {
        return buildSendRequest(
          "GET",
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

function buildSendRequest(
  method: HttpMethods,
  baseUrl: string,
  path: string,
  pipeline: Pipeline,
  requestOptions: RequestParameters = {},
  args: string[] = []
): Promise<HttpResponse> {
  // If the client has an api-version and the request doesn't specify one, inject the one in the client options
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
