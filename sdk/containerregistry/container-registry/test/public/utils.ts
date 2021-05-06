// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { env, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { ContainerRegistryClient, ContainerRepositoryClient } from "../../src";

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
      recording.replace(/"refresh_token":"[^"]+"/g, `"refresh_token":"refresh_token"`),
    (recording: string): string =>
      recording.replace(/access_token=(.+?)(&|")/, `access_token=access_token$2`),
    (recording: string): string =>
      recording.replace(/refresh_token=([^&]+?)(&|")/, `refresh_token=refresh_token$2`)
  ]
};

export function createRegistryClient(
  options: { anonymous: boolean } = { anonymous: false }
): ContainerRegistryClient {
  // Retrieve the endpoint from the environment variable
  // we saved to the .env file earlier
  const endpoint = env.CONTAINER_REGISTRY_ENDPOINT;

  if (options.anonymous) {
    return new ContainerRegistryClient(endpoint);
  }

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

  return new ContainerRegistryClient(endpoint, credential);
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

  return new ContainerRepositoryClient(endpoint, repository, credential);
}
