import { ClientOptions } from "@azure-rest/core-client";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "./generated/single";
import { GeneratedClient as GroupClient } from "./generated/group";
import createGenerateClient from "./generated/single/generatedClient";
import createGenerateGroupClient from "./generated/group/generatedClient";
import { createMetricsAdvisorKeyCredentialPolicy, MetricsAdvisorKeyCredential } from "./metricsAdvisorKeyCredentialPolicy";
import { MetricsAdvisorAdministrationClient, MetricsAdvisorClient } from "./generated/batch";

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

export function createGroupClient(endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}): GroupClient {
  if (isTokenCredential(credential)) {
    return createGenerateGroupClient(endpoint, credential, options);
  } else {
    const client = createGenerateGroupClient(endpoint, undefined as any, options);
    const authPolicy = createMetricsAdvisorKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}

export function createAdminClient(endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}): MetricsAdvisorAdministrationClient.Client.MetricsAdvisorAdministrationClient {
  if (isTokenCredential(credential)) {
    return MetricsAdvisorAdministrationClient.createClient(endpoint, credential, options);
  } else {
    const client = MetricsAdvisorAdministrationClient.createClient(endpoint, undefined as any, options);
    const authPolicy = createMetricsAdvisorKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}

export function createBatchClient(endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}): MetricsAdvisorClient.Client.MetricsAdvisorClient {
  if (isTokenCredential(credential)) {
    return MetricsAdvisorClient.createClient(endpoint, credential, options);
  } else {
    const client = MetricsAdvisorClient.createClient(endpoint, undefined as any, options);
    const authPolicy = createMetricsAdvisorKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}
