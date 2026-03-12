// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureAuthorityHosts } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import {
  ContainerRegistryContentClient,
  ContainerRegistryClient,
  KnownContainerRegistryAudience,
} from "../../src/index.js";

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const envSetupForPlayback: Record<string, string> = {
  CONTAINER_REGISTRY_ENDPOINT: "https://myregistry.azurecr.io",
  CONTAINER_REGISTRY_ANONYMOUS_ENDPOINT: "https://myregistry.azurecr.io",
  SUBSCRIPTION_ID: "subscription_id",
  RESOURCE_GROUP: "resource_group_id",
  REGISTRY: "myregistry",
};

const expiryReplacement = "eyJleHAiOjg2NDAwMDAwMDAwMDB9"; //  base64 encoding of '{"exp":8640000000000}' ;
export const recorderStartOptions: RecorderStartOptions = {
  // == Recorder Environment Setup == Add the replaceable variables from
  // above
  envSetupForPlayback,

  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: `"refresh_token":"[^"]+"`,
        value: `"refresh_token":"sanitized.${expiryReplacement}.sanitized"`,
      },
      {
        regex: true,
        target: `access_token=([^&]+?)(&|"|$)`,
        value: `access_token=SecretPlaceholder$2`,
      },
      {
        regex: true,
        target: `refresh_token=([^&]+?)(&|")`,
        value: `refresh_token=sanitized.${expiryReplacement}.sanitized$2`,
      },
      {
        regex: true,
        target: `sig=([^&]+)`,
        value: `sig=sanitized`,
      },
    ],
    bodyKeySanitizers: [
      {
        jsonPath: "access_token",
      },
    ],
  },

  removeCentralSanitizers: [
    // our own refresh token sanitizer above replaces the value with a valid JWT which is required for tests to work
    "AZSDK3401",
    // "name" as used in tag properties is not secret and does not need to be sanitized
    "AZSDK3493",
  ],
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
  recorder: Recorder,
  options: { anonymous: boolean } = { anonymous: false },
): ContainerRegistryClient {
  const authorityHost = getAuthority(endpoint);
  const audience = getAudience(authorityHost);
  const tokenCredentialOptions = authorityHost ? { authorityHost } : undefined;
  const clientOptions = {
    audience,
    serviceVersion: serviceVersion as ContainerRegistryServiceVersions,
  };

  if (options.anonymous) {
    return new ContainerRegistryClient(endpoint, recorder.configureClientOptions(clientOptions));
  }

  const credential = createTestCredential({ ...tokenCredentialOptions });

  return new ContainerRegistryClient(
    endpoint,
    credential,
    recorder.configureClientOptions(clientOptions),
  );
}

export function createBlobClient(
  endpoint: string,
  repositoryName: string,
  serviceVersion: string,
  recorder: Recorder,
): ContainerRegistryContentClient {
  const authorityHost = getAuthority(endpoint);
  const audience = getAudience(authorityHost);
  const tokenCredentialOptions = authorityHost ? { authorityHost } : undefined;
  const clientOptions = {
    audience,
    serviceVersion: serviceVersion as ContainerRegistryServiceVersions,
  };

  const credential = createTestCredential(tokenCredentialOptions);

  return new ContainerRegistryContentClient(
    endpoint,
    repositoryName,
    credential,
    recorder.configureClientOptions(clientOptions),
  );
}

export const serviceVersions = ["2021-07-01"] as const;
