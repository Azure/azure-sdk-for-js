// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, HttpMethods } from "../interfaces.js";
import type { Pipeline } from "../pipeline.js";
import { createDefaultPipeline } from "./clientHelpers.js";
import type {
  Client,
  ClientOptions,
  HttpBrowserStreamResponse,
  HttpNodeStreamResponse,
  InternalClientOptions,
  RequestParameters,
  ResourceMethods,
  StreamableMethod,
} from "./common.js";
import { sendRequest } from "./sendRequest.js";
import { buildRequestUrl } from "./urlHelpers.js";
import { isNodeLike } from "#platform/env";

/**
 * Creates a client with a default pipeline
 * @param endpoint - Base endpoint for the client
 * @param clientOptions - Client options
 * @param internalOptions - Additional options intended for use by generated clients
 */
export function getClient(
  endpoint: string,
  clientOptions: ClientOptions = {},
  internalOptions: InternalClientOptions = {},
): Client {
  const pipeline = clientOptions.pipeline ?? createDefaultPipeline(clientOptions);
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

  const addDefaultAcceptHeader = internalOptions.addDefaultAcceptHeader ?? true;
  const { allowInsecureConnection, httpClient } = clientOptions;
  const endpointUrl = clientOptions.endpoint ?? endpoint;
  const client = (path: string, ...args: Array<any>): ResourceMethods<StreamableMethod> => {
    const getUrl = (requestOptions: RequestParameters): string =>
      buildRequestUrl(endpointUrl, path, args, { allowInsecureConnection, ...requestOptions });

    return {
      get: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "GET",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      post: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "POST",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      put: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "PUT",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      patch: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "PATCH",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      delete: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "DELETE",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      head: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "HEAD",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      options: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "OPTIONS",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
        );
      },
      trace: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return buildOperation(
          "TRACE",
          getUrl(requestOptions),
          pipeline,
          requestOptions,
          allowInsecureConnection,
          httpClient,
          addDefaultAcceptHeader,
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
  httpClient?: HttpClient,
  addDefaultAcceptHeader: boolean = true,
): StreamableMethod {
  allowInsecureConnection = options.allowInsecureConnection ?? allowInsecureConnection;
  return {
    then: function (onFulfilled, onrejected) {
      return sendRequest(
        method,
        url,
        pipeline,
        { ...options, allowInsecureConnection, addDefaultAcceptHeader },
        httpClient,
      ).then(onFulfilled, onrejected);
    },
    async asBrowserStream() {
      if (isNodeLike) {
        throw new Error(
          "`asBrowserStream` is supported only in the browser environment. Use `asNodeStream` instead to obtain the response body stream. If you require a Web stream of the response in Node, consider using `Readable.toWeb` on the result of `asNodeStream`.",
        );
      } else {
        return sendRequest(
          method,
          url,
          pipeline,
          { ...options, allowInsecureConnection, addDefaultAcceptHeader, responseAsStream: true },
          httpClient,
        ) as Promise<HttpBrowserStreamResponse>;
      }
    },
    async asNodeStream() {
      if (isNodeLike) {
        return sendRequest(
          method,
          url,
          pipeline,
          { ...options, allowInsecureConnection, addDefaultAcceptHeader, responseAsStream: true },
          httpClient,
        ) as Promise<HttpNodeStreamResponse>;
      } else {
        throw new Error(
          "`isNodeStream` is not supported in the browser environment. Use `asBrowserStream` to obtain the response body stream.",
        );
      }
    },
  };
}
