// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isKeyCredential, isTokenCredential } from "@azure/core-auth";
import type { PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers.js";
import type { Client, ClientOptions, RequestParameters, StreamableMethod } from "./common.js";
import {
  getClient as tspGetClient,
  type ClientOptions as TspClientOptions,
  type InternalClientOptions,
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
 * @param internalOptions - Additional options intended for use by generated clients
 */
export function getClient(
  endpoint: string,
  options?: ClientOptions,
  internalOptions?: InternalClientOptions,
): Client;
/**
 * Creates a client with a default pipeline
 * @param endpoint - Base endpoint for the client
 * @param credentials - Credentials to authenticate the requests
 * @param options - Client options
 * @param internalOptions - Additional options intended for use by generated clients
 */
export function getClient(
  endpoint: string,
  credentials?: TokenCredential | KeyCredential,
  options?: ClientOptions,
  internalOptions?: InternalClientOptions,
): Client;
export function getClient(
  endpoint: string,
  credentialsOrPipelineOptions?: (TokenCredential | KeyCredential) | ClientOptions,
  clientOptionsOrInternalOptions?: ClientOptions | InternalClientOptions,
  maybeInternalOptions: InternalClientOptions = {},
): Client {
  let credentials: TokenCredential | KeyCredential | undefined;
  let clientOptions: ClientOptions = {};
  let internalOptions: InternalClientOptions = maybeInternalOptions;
  if (credentialsOrPipelineOptions && isCredential(credentialsOrPipelineOptions)) {
    // getClient(endpoint, credentials, options?, internalOptions?)
    credentials = credentialsOrPipelineOptions;
    clientOptions = (clientOptionsOrInternalOptions as ClientOptions) ?? {};
  } else if (credentialsOrPipelineOptions) {
    // getClient(endpoint, options, internalOptions?)
    clientOptions = credentialsOrPipelineOptions;
    internalOptions =
      (clientOptionsOrInternalOptions as InternalClientOptions) ?? maybeInternalOptions;
  } else {
    // getClient(endpoint, undefined, options?, internalOptions?)
    // Preserve the credential-overload form when credentials are absent so the
    // third argument continues to be treated as ClientOptions.
    clientOptions = (clientOptionsOrInternalOptions as ClientOptions) ?? {};
  }
  const pipeline =
    clientOptions.pipeline ?? createDefaultPipeline(endpoint, credentials, clientOptions);

  const tspClient = tspGetClient(
    endpoint,
    {
      ...clientOptions,
      pipeline,
    } as TspClientOptions,
    internalOptions,
  ) as Client;

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
