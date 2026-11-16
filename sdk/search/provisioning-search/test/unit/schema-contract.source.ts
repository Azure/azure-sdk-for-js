// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-search.
 * provisioning API: @azure/provisioning-search/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  IdentityInput,
  IpRuleInput,
  NetworkRuleSetInput,
  PrivateEndpointConnectionPropertiesInput,
  PrivateEndpointConnectionPropertiesPrivateEndpointInput,
  PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateInput,
  SearchServicePropertiesInput,
  SharedPrivateLinkResourcePropertiesInput,
  SkuInput,
} from "@azure/provisioning-search/types";

// Accepted Bicep contract: Microsoft.Search/searchServices -> IdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices?pivots=deployment-language-bicep
export const identitySearchservices39a1b957b92bc5a8ef49FromBicep: IdentityInput = {
  type: "None",
};

// Accepted Bicep contract: Microsoft.Search/searchServices -> IpRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices?pivots=deployment-language-bicep
export const ipRuleSearchservices39a1b957b9c6e7f7f2cfFromBicep: IpRuleInput = {
  value: "string",
};

// Accepted Bicep contract: Microsoft.Search/searchServices -> NetworkRuleSetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices?pivots=deployment-language-bicep
export const networkRuleSetSearchservices39a1b957b95bfe0bc3adFromBicep: NetworkRuleSetInput = {
  bypass: "AzureServices",
  ipRules: [],
};

// Accepted Bicep contract: Microsoft.Search/searchServices/privateEndpointConnections -> PrivateEndpointConnectionPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointConnectionPropertiesSearchservicesPrivateendpointconnections21f09505d938eeebd1a6FromBicep: PrivateEndpointConnectionPropertiesInput =
  {
    groupId: "string",
  };

// Accepted Bicep contract: Microsoft.Search/searchServices/privateEndpointConnections -> PrivateEndpointConnectionPropertiesPrivateEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointConnectionPropertiesPrivateEndpointSearchservicesPrivateendpointconnections21f09505d9cd279e157fFromBicep: PrivateEndpointConnectionPropertiesPrivateEndpointInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.Search/searchServices/privateEndpointConnections -> PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateSearchservicesPrivateendpointconnections21f09505d9415a666363FromBicep: PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateInput =
  {
    actionsRequired: "string",
    description: "string",
  };

// Accepted Bicep contract: Microsoft.Search/searchServices -> SearchServicePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices?pivots=deployment-language-bicep
export const searchServicePropertiesSearchservices39a1b957b92cb42c21dbFromBicep: SearchServicePropertiesInput =
  {
    computeType: "Confidential",
    dataExfiltrationProtections: [],
    disableLocalAuth: true,
    endpoint: "string",
    partitionCount: 0,
    publicNetworkAccess: "Disabled",
    replicaCount: 0,
    semanticSearch: "disabled",
    upgradeAvailable: "available",
  };

// Accepted Bicep contract: Microsoft.Search/searchServices/sharedPrivateLinkResources -> SharedPrivateLinkResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices/sharedprivatelinkresources?pivots=deployment-language-bicep
export const sharedPrivateLinkResourcePropertiesSearchservicesSharedprivatelinkresourcesbc053741fabf4a885588FromBicep: SharedPrivateLinkResourcePropertiesInput =
  {
    groupId: "string",
    privateLinkResourceId: "string",
    requestMessage: "string",
    resourceRegion: "string",
    status: "Approved",
  };

// Accepted Bicep contract: Microsoft.Search/searchServices -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.search/2025-05-01/searchservices?pivots=deployment-language-bicep
export const skuSearchservices39a1b957b9441c24b7b0FromBicep: SkuInput = {
  name: "basic",
};
