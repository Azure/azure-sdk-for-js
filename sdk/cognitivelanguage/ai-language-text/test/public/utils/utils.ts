// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureAuthorityHosts } from "@azure/identity";

export function getAuthority(endpoint: string): AzureAuthorityHosts | undefined {
  if (endpoint.endsWith(".com/.default")) {
    return AzureAuthorityHosts.AzureChina;
  }
  if (endpoint.endsWith(".us/.default")) {
    return AzureAuthorityHosts.AzureGermany;
  }
  if (endpoint.endsWith(".cn/.default")) {
    return AzureAuthorityHosts.AzureGovernment;
  }
  return undefined;
}

export function getAudience(authority?: AzureAuthorityHosts): string {
  switch (authority) {
    case AzureAuthorityHosts.AzureChina:
      return "https://cognitiveservices.azure.cn/.default";
    case AzureAuthorityHosts.AzureGovernment:
      return "https://cognitiveservices.azure.us/.default";
    default:
      return "https://cognitiveservices.azure.com/.default";
  }
}
