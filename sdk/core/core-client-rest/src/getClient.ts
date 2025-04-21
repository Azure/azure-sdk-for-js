// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isKeyCredential, isTokenCredential } from "@azure/core-auth";
import { createPipelineFromOptions, type PipelineOptions } from "@azure/core-rest-pipeline";
import { addCredentialPipelinePolicy } from "./clientHelpers.js";
import type { Client, ClientOptions, RequestParameters, StreamableMethod } from "./common.js";
import {
  getClient as tspGetClient,
  type ClientOptions as TspClientOptions,
} from "@typespec/ts-http-runtime";

/**
 * Function to wrap RequestParameters so that we get the legacy onResponse behavior in core-client-rest
 */
function wrapRequestParameters(parameters: RequestParameters): RequestParameters {
  const wrapped = { ...parameters };
  if (parameters.onResponse) {
    wrapped.onResponse = function (rawResponse, error) {
      parameters.onResponse!(rawResponse, error, error);
    };
  }
  return wrapped;
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
  let credentials: TokenCredential | KeyCredential | undefined;
  if (credentialsOrPipelineOptions) {
    if (isCredential(credentialsOrPipelineOptions)) {
      credentials = credentialsOrPipelineOptions;
    } else {
      clientOptions = credentialsOrPipelineOptions ?? {};
    }
  }

  const tspClient = tspGetClient(endpoint, clientOptions as TspClientOptions) as Client;

  // Overwrite the pipeline here to use the Azure one instead of the TypeSpec default pipeline
  tspClient.pipeline = createPipelineFromOptions(clientOptions);
  if (clientOptions.additionalPolicies?.length) {
    for (const { policy, position } of clientOptions.additionalPolicies) {
      // Sign happens after Retry and is commonly needed to occur
      // before policies that intercept post-retry.
      const afterPhase = position === "perRetry" ? "Sign" : undefined;
      tspClient.pipeline.addPolicy(policy, {
        afterPhase,
      });
    }
  }

  if (credentials) {
    addCredentialPipelinePolicy(tspClient.pipeline, endpoint, {
      clientOptions,
      credential: credentials,
    });
  }

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
