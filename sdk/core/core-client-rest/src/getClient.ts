// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createDefaultPipeline } from "./clientHelpers";
import { ClientOptions, HttpResponse, Client } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { buildSendRequest, isCredential } from "./helpers/getClientHelpers";

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
