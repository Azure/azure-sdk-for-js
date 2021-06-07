// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  Pipeline,
  createDefaultHttpClient,
  HttpClient,
} from "@azure/core-rest-pipeline";
import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { ClientOptions } from "./common";
import { keyCredentialAuthenticationPolicy } from "./keyCredentialAuthenticationPolicy";

let cachedHttpClient: HttpClient | undefined;

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(
  baseUrl: string,
  credential?: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): Pipeline {
  const pipeline = createPipelineFromOptions(options);
  pipeline.removePolicy({ name: "exponentialRetryPolicy" });

  if (credential) {
    if (isTokenCredential(credential)) {
      const tokenPolicy = bearerTokenAuthenticationPolicy({
        credential,
        scopes: options.credentials?.scopes ?? `${baseUrl}/.default`,
      });
      pipeline.addPolicy(tokenPolicy);
    } else if (isKeyCredential(credential)) {
      if (!options.credentials?.apiKeyHeaderName) {
        throw new Error(`Missing API Key Header Name`);
      }
      const keyPolicy = keyCredentialAuthenticationPolicy(
        credential,
        options.credentials?.apiKeyHeaderName
      );
      pipeline.addPolicy(keyPolicy);
    }
  }

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
