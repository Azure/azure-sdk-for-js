// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createDefaultPipeline } from "./clientHelpers";
import { ClientOptions, HttpResponse, ClientResource, StreamableMethod, Client } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { buildSendRequest, isCredential, StreamType } from "./helpers/getClientHelpers";
import { HttpNodeStreamResponse } from ".";

/**
 * Creates a client with a default pipeline that has methods to get response as Streams
 * @param baseUrl - Base endpoint for the client
 * @param options - Client options
 */
export function getClient(baseUrl: string, options?: ClientOptions): Client;
/**
 * Creates a client with a default pipeline that has methods to get response as Streams
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

  const resourceWithAsStream = (
    path: string,
    ...args: Array<any>
  ): ClientResource<StreamableMethod> => ({
    get(options: RequestParameters = {}) {
      const operation = (streamType?: StreamType) =>
        buildSendRequest(
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
        buildSendRequest(
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
        buildSendRequest(
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
        buildSendRequest(
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
        buildSendRequest(
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
        buildSendRequest(
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
        buildSendRequest(
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
        buildSendRequest(
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

function getStreamableMethods(sendRequest: SendRequestOperation): StreamableMethod {
  return {
    then: async function (onfulfilled) {
      const result = await sendRequest();
      return onfulfilled(result);
    },
    async asNodeStream() {
      return sendRequest("NodeJS");
    },
  };
}
