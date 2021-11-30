// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createEmptyPipeline,
  bearerTokenAuthenticationPolicy,
  Pipeline,
  createDefaultHttpClient,
  HttpClient,
  proxyPolicy,
  decompressResponsePolicy,
  formDataPolicy,
  userAgentPolicy,
  setClientRequestIdPolicy,
  throttlingRetryPolicy,
  systemErrorRetryPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  logPolicy,
} from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { ClientOptions } from "./common";
import { keyCredentialAuthenticationPolicy } from "./keyCredentialAuthenticationPolicy";
import { apiVersionPolicy } from "./apiVersionPolicy";

let cachedHttpClient: HttpClient | undefined;

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(
  baseUrl: string,
  credential?: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): Pipeline {
  const pipeline = createEmptyPipeline();

  if (isNode) {
    pipeline.addPolicy(proxyPolicy(options.proxyOptions));
    pipeline.addPolicy(decompressResponsePolicy());
  }

  pipeline.addPolicy(formDataPolicy());
  pipeline.addPolicy(userAgentPolicy(options.userAgentOptions));
  pipeline.addPolicy(setClientRequestIdPolicy());
  pipeline.addPolicy(throttlingRetryPolicy(), { phase: "Retry" });
  pipeline.addPolicy(systemErrorRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(exponentialRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(redirectPolicy(options.redirectOptions), { afterPhase: "Retry" });
  pipeline.addPolicy(logPolicy(), { afterPhase: "Retry" });

  pipeline.addPolicy(apiVersionPolicy(options));

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
