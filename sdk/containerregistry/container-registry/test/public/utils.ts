// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { env, isPlaybackMode, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { ContainerRegistryClient, ContainerRepositoryClient } from "../../src";
import { GeneratedClient } from "../../src/generated";
import { sanitizationPolicyV2 } from "./sanitizationPolicyV2";

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const replaceableVariables: Record<string, string> = {
  CONTAINER_REGISTRY_ENDPOINT: "https://myregistry.azurecr.io",
  AZURE_TENANT_ID: "azure_tenant_id",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  SUBSCRIPTION_ID: "subscription_id",
  RESOURCE_GROUP: "resource_group_id",
  REGISTRY: "myregistry"
};

export const recorderEnvSetup: RecorderEnvironmentSetup = {
  // == Recorder Environment Setup == Add the replaceable variables from
  // above
  replaceableVariables,

  // We don't use this in the template, but if we had any query parameters
  // we wished to discard, we could add them here
  queryParametersToSkip: [],

  // Finally, we need to remove the AAD `refresh_token` from any requests.
  // This is very important, as it cannot be removed using environment
  // variable or query parameter replacement.  The
  // `customizationsOnRecordings` field allows us to make arbitrary
  // replacements within recordings.
  customizationsOnRecordings: [
    (recording: string): string =>
      recording
        .replace(/"refresh_token":"[^"]*"/g, `"refresh_token":"refresh_token"`)
        .replace(/access_token=(.+?)(&|")/, `access_token=access_token$2`)
        .replace(/refresh_token=(.+?)(&|")/, `refresh_token=refresh_token$2`)
        .replace(/scope=(.+?)(&|")/, `scope=https%3A%2F%2Fsanitized%2F$2`)
  ]
};

export function createRegistryClient(): ContainerRegistryClient {
  // Retrieve the endpoint from the environment variable
  // we saved to the .env file earlier
  const endpoint = env.CONTAINER_REGISTRY_ENDPOINT;

  // We use ClientSecretCredential instead of DefaultAzureCredential in order
  // to ensure that the requests made to the AAD server are always the same. If
  // we used DefaultAzureCredential, they might be different on some machines
  // than on others, depending on which credentials are available (such as
  // Managed Identity or developer credentials).
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const client = new ContainerRegistryClient(endpoint, credential);
  if (isPlaybackMode()) {
    // inject sanitizationPolicy
    const policy = sanitizationPolicyV2({
      headerNames: [],
      searchParamNames: [],
      bodySanitizers: [
        (body: string): string =>
          body.replace(/scope=https(.+?)(&+|$)/, `scope=https%3A%2F%2Fsanitized%2F$2`)
      ]
    });
    ((client as any).authClient as GeneratedClient).pipeline.addPolicy(policy, {
      afterPhase: "Serialize"
    });
  }
  return client;
}

export function createRepositoryClient(repository: string): ContainerRepositoryClient {
  // Retrieve the endpoint from the environment variable
  // we saved to the .env file earlier
  const endpoint = env.CONTAINER_REGISTRY_ENDPOINT;

  // We use ClientSecretCredential instead of DefaultAzureCredential in order
  // to ensure that the requests made to the AAD server are always the same. If
  // we used DefaultAzureCredential, they might be different on some machines
  // than on others, depending on which credentials are available (such as
  // Managed Identity or developer credentials).
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const client = new ContainerRepositoryClient(endpoint, repository, credential);
  if (isPlaybackMode()) {
    // inject sanitizationPolicy
    const policy = sanitizationPolicyV2({
      headerNames: [],
      searchParamNames: [],
      bodySanitizers: [
        (body: string): string =>
          body.replace(/scope=https(.+?)(&+|$)/, `scope=https%3A%2F%2Fsanitized%2F$2`)
      ]
    });
    ((client as any).authClient as GeneratedClient).pipeline.addPolicy(policy, {
      afterPhase: "Serialize"
    });
  }
  return client;
}
