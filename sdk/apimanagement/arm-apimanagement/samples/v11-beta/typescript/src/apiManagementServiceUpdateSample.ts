// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing API Management service.
 *
 * @summary updates an existing API Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateServiceDisableTls10.json
 */
async function apiManagementUpdateServiceDisableTls10(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.update("rg1", "apimService1", {
    customProperties: {
      "Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10": "false",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing API Management service.
 *
 * @summary updates an existing API Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateServicePublisherDetails.json
 */
async function apiManagementUpdateServicePublisherDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.update("rg1", "apimService1", {
    publisherEmail: "foobar@live.com",
    publisherName: "Contoso Vnext",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing API Management service.
 *
 * @summary updates an existing API Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateServiceToNewVnetAndAZs.json
 */
async function apiManagementUpdateServiceToNewVnetAndAvailabilityZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.update("rg1", "apimService1", {
    additionalLocations: [
      {
        location: "Australia East",
        publicIpAddressId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/apim-australia-east-publicip",
        sku: { name: "Premium", capacity: 3 },
        virtualNetworkConfiguration: {
          subnetResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/apimaeavnet/subnets/default",
        },
        zones: ["1", "2", "3"],
      },
    ],
    publicIpAddressId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/publicip-apim-japan-east",
    virtualNetworkConfiguration: {
      subnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet-apim-japaneast/subnets/apim2",
    },
    virtualNetworkType: "External",
    sku: { name: "Premium", capacity: 3 },
    zones: ["1", "2", "3"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateServiceDisableTls10();
  await apiManagementUpdateServicePublisherDetails();
  await apiManagementUpdateServiceToNewVnetAndAvailabilityZones();
}

main().catch(console.error);
