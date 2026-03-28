// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateStandardGateway.json
 */
async function apiManagementCreateStandardGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.createOrUpdate("rg1", "apimGateway1", {
    location: "South Central US",
    backend: {
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vn1/subnets/sn1",
      },
    },
    sku: { name: "Standard", capacity: 1 },
    tags: { Name: "Contoso", Test: "User" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspacePremiumGateway.json
 */
async function apiManagementCreateWorkspacePremiumGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.createOrUpdate("rg1", "apimGateway1", {
    location: "South Central US",
    backend: {
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vn1/subnets/sn1",
      },
    },
    virtualNetworkType: "External",
    sku: { name: "WorkspaceGatewayPremium", capacity: 1 },
    tags: { Name: "Contoso", Test: "User" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateStandardGateway();
  await apiManagementCreateWorkspacePremiumGateway();
}

main().catch(console.error);
