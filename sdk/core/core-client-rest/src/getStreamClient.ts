// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createDefaultPipeline } from "./clientHelpers";
import {
  ClientOptions,
  HttpResponse,
  Client,
  ClientResource,
  MethodwithAsStream,
  PathUncheckedResponse,
} from "./common";
import { RequestParameters } from "./pathClientTypes";
import { getNodeStreamResponse } from "./helpers/streamHelpers";
import { buildSendRequestForStream, isCredential } from "./helpers/getClientHelpers";

/**
 * Shape of a Rest Level Client
 */
export interface ClientWithAsStream extends Client {
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: (
    path: string,
    ...args: Array<string | number | boolean>
  ) => ClientResource<MethodwithAsStream>;
}

/**
 * Creates a client with a default pipeline that has methods to get response as Streams
 * @param baseUrl - Base endpoint for the client
 * @param options - Client options
 */
export function getClientWithStream(baseUrl: string, options?: ClientOptions): ClientWithAsStream;
/**
 * Creates a client with a default pipeline that has methods to get response as Streams
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
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "GET",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );

      return getStreamableMethods(operation);
    },
    post(options: RequestParameters = {}) {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "POST",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );
      return getStreamableMethods(operation);
    },
    put: (options: RequestParameters = {}) => {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "PUT",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );
      return getStreamableMethods(operation);
    },
    patch: (options: RequestParameters = {}) => {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "PATCH",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );
      return getStreamableMethods(operation);
    },
    delete: (options: RequestParameters = {}) => {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "DELETE",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );

      return getStreamableMethods(operation);
    },
    head: (options: RequestParameters = {}) => {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "HEAD",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );
      return getStreamableMethods(operation);
    },
    options: (options: RequestParameters = {}) => {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "OPTIONS",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );
      return getStreamableMethods(operation);
    },
    trace: (options: RequestParameters = {}) => {
      const operation = (asStream?: boolean) =>
        buildSendRequestForStream(
          "TRACE",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          { allowInsecureConnection, ...options, responseAsStream: asStream },
          args
        );
      return getStreamableMethods(operation);
    },
  });

  return {
    path: resourceWithAsStream,
    pathUnchecked: resourceWithAsStream,
    pipeline,
  };
}

function getStreamableMethods(
  sendRequest: (asStream?: boolean) => Promise<HttpResponse>
): MethodwithAsStream {
  return {
    then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
      const result = await sendRequest();
      return onfulfilled(result);
    },
    async asNodeStream() {
      const result = await sendRequest(true);
      return getNodeStreamResponse(result);
    },
  };
}
