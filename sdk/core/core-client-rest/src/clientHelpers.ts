// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, Pipeline } from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  createDefaultHttpClient,
} from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";

import type { ClientOptions } from "./common.js";
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

function isKeyCredential(credential: any): credential is KeyCredential {
  return (credential as KeyCredential).key !== undefined;
}

export function getCachedDefaultHttpsClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient();
  }

  return cachedHttpClient;
}
