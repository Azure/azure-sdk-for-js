// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient } from "../interfaces.js";
import type { Pipeline } from "../pipeline.js";
import { createDefaultHttpClient } from "../defaultHttpClient.js";
import { createPipelineFromOptions } from "../createPipelineFromOptions.js";
import type { ClientOptions } from "./common.js";
import { apiVersionPolicy } from "./apiVersionPolicy.js";
import {
  isApiKeyCredential,
  isBasicCredential,
  isBearerTokenCredential,
  isOAuth2TokenCredential,
} from "../auth/credentials.js";
import { apiKeyAuthenticationPolicy } from "../policies/auth/apiKeyAuthenticationPolicy.js";
import { basicAuthenticationPolicy } from "../policies/auth/basicAuthenticationPolicy.js";
import { bearerAuthenticationPolicy } from "../policies/auth/bearerAuthenticationPolicy.js";
import { oauth2AuthenticationPolicy } from "../policies/auth/oauth2AuthenticationPolicy.js";

let cachedHttpClient: HttpClient | undefined;

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(options: ClientOptions = {}): Pipeline {
  const pipeline = createPipelineFromOptions(options);

  pipeline.addPolicy(apiVersionPolicy(options));

  const { credential, authSchemes } = options;
  if (credential) {
    if (isApiKeyCredential(credential)) {
      console.log("GET HERE");
      pipeline.addPolicy(apiKeyAuthenticationPolicy({ authSchemes, credential }));
    } else if (isBasicCredential(credential)) {
      pipeline.addPolicy(basicAuthenticationPolicy({ authSchemes, credential }));
    } else if (isBearerTokenCredential(credential)) {
      pipeline.addPolicy(bearerAuthenticationPolicy({ authSchemes, credential }));
    } else if (isOAuth2TokenCredential(credential)) {
      pipeline.addPolicy(oauth2AuthenticationPolicy({ authSchemes, credential }));
    }
  }

  return pipeline;
}

export function getCachedDefaultHttpsClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient();
  }

  return cachedHttpClient;
}
