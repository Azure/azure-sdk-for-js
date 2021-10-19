// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureAuthorityHosts, ClientSecretCredential } from "@azure/identity";
import {
  env,
  RecorderEnvironmentSetup,
  pluginForClientSecretCredentialTests
} from "@azure-tools/test-recorder";
import { ContainerRegistryClient, KnownContainerRegistryAudience } from "../../src";

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const replaceableVariables: Record<string, string> = {
  CONTAINER_REGISTRY_ENDPOINT: "https://myregistry.azurecr.io",
  CONTAINER_REGISTRY_ANONYMOUS_ENDPOINT: "https://myregistry.azurecr.io",
  CONTAINERREGISTRY_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  CONTAINERREGISTRY_CLIENT_ID: "azure_client_id",
  CONTAINERREGISTRY_CLIENT_SECRET: "azure_client_secret",
  SUBSCRIPTION_ID: "subscription_id",
  RESOURCE_GROUP: "resource_group_id",
  REGISTRY: "myregistry"
};

const expiryReplacement = "eyJleHAiOjg2NDAwMDAwMDAwMDB9"; //  base64 encoding of '{"exp":8640000000000}' ;
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
      recording.replace(
        /"refresh_token":"[^"]+"/g,
        `"refresh_token":"sanitized.${expiryReplacement}.sanitized"`
      ),
    (recording: string): string =>
      recording.replace(/access_token=(.+?)(&|")/, `access_token=access_token$2`),
    (recording: string): string =>
      recording.replace(
        /refresh_token=([^&]+?)(&|")/,
        `refresh_token=sanitized.${expiryReplacement}.sanitized$2`
      )
  ],
  onLoadCallbackForPlayback: () => {
    pluginForClientSecretCredentialTests(env.CONTAINERREGISTRY_TENANT_ID);
  }
};

function getAuthority(endpoint: string): AzureAuthorityHosts | undefined {
  if (endpoint.endsWith(".azurecr.cn")) {
    return AzureAuthorityHosts.AzureChina;
  }
  if (endpoint.endsWith("azurecr.de")) {
    return AzureAuthorityHosts.AzureGermany;
  }
  if (endpoint.endsWith(".azurecr.us")) {
    return AzureAuthorityHosts.AzureGovernment;
  }
  return undefined;
}

function getAudience(authority?: AzureAuthorityHosts): KnownContainerRegistryAudience {
  switch (authority) {
    case AzureAuthorityHosts.AzureChina:
      return KnownContainerRegistryAudience.AzureResourceManagerChina;
    case AzureAuthorityHosts.AzureGermany:
      return KnownContainerRegistryAudience.AzureResourceManagerGermany;
    case AzureAuthorityHosts.AzureGovernment:
      return KnownContainerRegistryAudience.AzureResourceManagerGovernment;
    default:
      return KnownContainerRegistryAudience.AzureResourceManagerPublicCloud;
  }
}

type ContainerRegistryServiceVersions = "2021-07-01";
export function createRegistryClient(
  endpoint: string,
  serviceVersion: string,
  options: { anonymous: boolean } = { anonymous: false }
): ContainerRegistryClient {
  const authorityHost = getAuthority(endpoint);
  const audience = getAudience(authorityHost);
  const tokenCredentialOptions = authorityHost ? { authorityHost } : undefined;
  const clientOptions = {
    audience,
    serviceVersion: serviceVersion as ContainerRegistryServiceVersions
  };

  if (options.anonymous) {
    return new ContainerRegistryClient(endpoint, clientOptions);
  }

  // We use ClientSecretCredential instead of DefaultAzureCredential in order
  // to ensure that the requests made to the AAD server are always the same. If
  // we used DefaultAzureCredential, they might be different on some machines
  // than on others, depending on which credentials are available (such as
  // Managed Identity or developer credentials).
  const credential = new ClientSecretCredential(
    env.CONTAINERREGISTRY_TENANT_ID,
    env.CONTAINERREGISTRY_CLIENT_ID,
    env.CONTAINERREGISTRY_CLIENT_SECRET,
    tokenCredentialOptions
  );

  return new ContainerRegistryClient(endpoint, credential, clientOptions);
}

export const serviceVersions = ["2021-07-01"] as const;
