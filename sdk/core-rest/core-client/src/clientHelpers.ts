import {
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  Pipeline,
  createDefaultHttpClient,
  HttpClient,
  PipelinePolicy,
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
    let credentialPolicy: PipelinePolicy;
    if (isTokenCredential(credential)) {
      credentialPolicy = bearerTokenAuthenticationPolicy({
        credential,
        scopes: options.credentials?.scopes ?? `${baseUrl}/.default`,
      });
    } else {
      if (!options.credentials?.apiKeyHeaderName) {
        throw new Error(`Missing API Key Header Name`);
      }
      credentialPolicy = keyCredentialAuthenticationPolicy(
        credential,
        options.credentials?.apiKeyHeaderName
      );
    }
    pipeline.addPolicy(credentialPolicy);
  }

  return pipeline;
}

export function getCachedDefaultHttpsClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient();
  }

  return cachedHttpClient;
}
