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
import { buildSendRequestForStream, isCredential, StreamType } from "./helpers/getClientHelpers";
import { HttpNodeStreamResponse } from ".";
import { getNodeStreamResponse } from "./helpers/streamHelpers";

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
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "GET",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );

      return getStreamableMethods(operation);
    },
    post(options: RequestParameters = {}) {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "POST",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );
      return getStreamableMethods(operation);
    },
    put: (options: RequestParameters = {}) => {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "PUT",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );
      return getStreamableMethods(operation);
    },
    patch: (options: RequestParameters = {}) => {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "PATCH",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );
      return getStreamableMethods(operation);
    },
    delete: (options: RequestParameters = {}) => {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "DELETE",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );

      return getStreamableMethods(operation);
    },
    head: (options: RequestParameters = {}) => {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "HEAD",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );
      return getStreamableMethods(operation);
    },
    options: (options: RequestParameters = {}) => {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "OPTIONS",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
          args
        );
      return getStreamableMethods(operation);
    },
    trace: (options: RequestParameters = {}) => {
      const operation = (streamType?: StreamType) =>
        buildSendRequestForStream(
          "TRACE",
          clientOptions,
          baseUrl,
          path,
          pipeline,
          streamType,
          { allowInsecureConnection, ...options },
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

interface SendRequestOperation {
  (streamType: "NodeJS"): Promise<HttpNodeStreamResponse>;
  (streamType?: StreamType): Promise<HttpResponse>;
}

function getStreamableMethods(sendRequest: SendRequestOperation): MethodwithAsStream {
  return {
    then: async function (onfulfilled: (r: PathUncheckedResponse) => PathUncheckedResponse) {
      const result = await sendRequest();
      return onfulfilled(result);
    },
    async asNodeStream() {
      const result = await sendRequest("NodeJS");
      return getNodeStreamResponse(result);
    },
  };
}
