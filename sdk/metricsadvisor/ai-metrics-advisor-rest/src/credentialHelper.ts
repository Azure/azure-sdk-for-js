import { ClientOptions } from "@azure-rest/core-client";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { GeneratedClientLike } from "./generated";
import GeneratedClient from "./generated/generatedClient";
import { createMetricsAdvisorKeyCredentialPolicy, MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";

export function createClient(endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}): GeneratedClientLike {
  const client = GeneratedClient(endpoint, options);
  const authPolicy = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy({ credential, scopes: "https://cognitiveservices.azure.com/.default" })
    : createMetricsAdvisorKeyCredentialPolicy(credential);
  client.pipeline.addPolicy(authPolicy);
  return client;
}
