// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isKeyCredential, isTokenCredential } from "@azure/core-auth";
import type { Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers.js";
import type { Client, ClientOptions, RequestParameters, StreamableMethod } from "./common.js";
import {
  getClient as tspGetClient,
  type ClientOptions as TspClientOptions,
} from "@typespec/ts-http-runtime";

/**
 * Function to wrap RequestParameters so that we get the legacy onResponse behavior in core-client-rest
 */
function wrapRequestParameters(parameters: RequestParameters): RequestParameters {
  if (parameters.onResponse) {
    return {
      ...parameters,
      onResponse(rawResponse, error) {
        parameters.onResponse?.(rawResponse, error, error);
      },
    };
  }

  return parameters;
}

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
  let pipeline: Pipeline | undefined;
  if ((clientOptions as any)["pipeline"]) {
    pipeline = (clientOptions as any)["pipeline"] as Pipeline;
  } else {
    let credentials: TokenCredential | KeyCredential | undefined;
    if (credentialsOrPipelineOptions) {
      if (isCredential(credentialsOrPipelineOptions)) {
        credentials = credentialsOrPipelineOptions;
      } else {
        clientOptions = credentialsOrPipelineOptions ?? {};
      }
    }

    pipeline = createDefaultPipeline(endpoint, credentials, clientOptions);
  }
  const tspClient = tspGetClient(endpoint, {
    ...clientOptions,
    pipeline,
  } as TspClientOptions) as Client;

  const client = (path: string, ...args: Array<any>) => {
    return {
      get: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).get(wrapRequestParameters(requestOptions));
      },
      post: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).post(wrapRequestParameters(requestOptions));
      },
      put: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).put(wrapRequestParameters(requestOptions));
      },
      patch: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).patch(wrapRequestParameters(requestOptions));
      },
      delete: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).delete(wrapRequestParameters(requestOptions));
      },
      head: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).head(wrapRequestParameters(requestOptions));
      },
      options: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).options(wrapRequestParameters(requestOptions));
      },
      trace: (requestOptions: RequestParameters = {}): StreamableMethod => {
        return tspClient.path(path, ...args).trace(wrapRequestParameters(requestOptions));
      },
    };
  };

  return {
    path: client,
    pathUnchecked: client,
    pipeline: tspClient.pipeline,
  };
}

function isCredential(
  param: (TokenCredential | KeyCredential) | PipelineOptions,
): param is TokenCredential | KeyCredential {
  return isKeyCredential(param) || isTokenCredential(param);
}
