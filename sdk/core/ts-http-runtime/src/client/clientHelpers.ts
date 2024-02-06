// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "../interfaces";
import { Pipeline } from "../pipeline";
import { bearerTokenAuthenticationPolicy } from "../policies/bearerTokenAuthenticationPolicy";
import { createDefaultHttpClient } from "../defaultHttpClient";
import { createPipelineFromOptions } from "../createPipelineFromOptions";
import { TokenCredential, isTokenCredential } from "../auth/tokenCredential";
import { KeyCredential } from "../auth/keyCredential";

import { ClientOptions } from "./common";
import { apiVersionPolicy } from "./apiVersionPolicy";
import { keyCredentialAuthenticationPolicy } from "./keyCredentialAuthenticationPolicy";

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
  baseUrl: string,
  options: AddCredentialPipelinePolicyOptions = {}
): void {
  const { credential, clientOptions } = options;
  if (!credential) {
    return;
  }

  if (isTokenCredential(credential)) {
    const tokenPolicy = bearerTokenAuthenticationPolicy({
      credential,
      scopes: clientOptions?.credentials?.scopes ?? `${baseUrl}/.default`,
    });
    pipeline.addPolicy(tokenPolicy);
  } else if (isKeyCredential(credential)) {
    if (!clientOptions?.credentials?.apiKeyHeaderName) {
      throw new Error(`Missing API Key Header Name`);
    }
    const keyPolicy = keyCredentialAuthenticationPolicy(
      credential,
      clientOptions?.credentials?.apiKeyHeaderName
    );
    pipeline.addPolicy(keyPolicy);
  }
}

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(
  baseUrl: string,
  credential?: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): Pipeline {
  const pipeline = createPipelineFromOptions(options);

  pipeline.addPolicy(apiVersionPolicy(options));

  addCredentialPipelinePolicy(pipeline, baseUrl, { credential, clientOptions: options });
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
