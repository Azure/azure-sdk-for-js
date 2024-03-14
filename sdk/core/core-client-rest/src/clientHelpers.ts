// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  Pipeline,
  bearerTokenAuthenticationPolicy,
  createDefaultHttpClient,
  createPipelineFromOptions,
} from "@azure/core-rest-pipeline";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";

import { ClientOptions } from "./common.js";
import { apiVersionPolicy } from "./apiVersionPolicy.js";
import { keyCredentialAuthenticationPolicy } from "./keyCredentialAuthenticationPolicy.js";

let cachedHttpClient: HttpClient | undefined;

/**
 * Optional parameters for adding a credential policy to the pipeline.
 */
export interface AddCredentialPipelinePolicyOptions {
  /**
   * Options related to the client.
   */
  clientOptions?: ClientOptions;
  /**
   * The credential to use.
   */
  credential?: TokenCredential | KeyCredential;
}

/**
 * Adds a credential policy to the pipeline if a credential is provided. If none is provided, no policy is added.
 */
export function addCredentialPipelinePolicy(
  pipeline: Pipeline,
  endpoint: string,
  options: AddCredentialPipelinePolicyOptions = {},
): void {
  const { credential, clientOptions } = options;
  if (!credential) {
    return;
  }

  if (isTokenCredential(credential)) {
    const tokenPolicy = bearerTokenAuthenticationPolicy({
      credential,
      scopes: clientOptions?.credentials?.scopes ?? `${endpoint}/.default`,
    });
    pipeline.addPolicy(tokenPolicy);
  } else if (isKeyCredential(credential)) {
    if (!clientOptions?.credentials?.apiKeyHeaderName) {
      throw new Error(`Missing API Key Header Name`);
    }
    const keyPolicy = keyCredentialAuthenticationPolicy(
      credential,
      clientOptions?.credentials?.apiKeyHeaderName,
    );
    pipeline.addPolicy(keyPolicy);
  }
}

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(
  endpoint: string,
  credential?: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): Pipeline {
  const pipeline = createPipelineFromOptions(options);

  pipeline.addPolicy(apiVersionPolicy(options));

  addCredentialPipelinePolicy(pipeline, endpoint, { credential, clientOptions: options });
  return pipeline;
}

function isKeyCredential(credential: any): credential is KeyCredential {
  return (credential as KeyCredential).key !== undefined;
}

export function getCachedDefaultHttpsClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient();
  }

  return cachedHttpClient;
}
