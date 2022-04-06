import { ClientOptions } from "@azure-rest/core-client";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "./generated";
import createGenerateClient from "./generated/generatedClient";
import { createMetricsAdvisorKeyCredentialPolicy, MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";

export function createClient(endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}): GeneratedClient {
  if (isTokenCredential(credential)) {
    return createGenerateClient(endpoint, credential, options);
  } else {
    const client = createGenerateClient(endpoint, undefined as any, options);
    const authPolicy = createMetricsAdvisorKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}
