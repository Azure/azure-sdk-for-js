// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a publicIPAddress. Please note some properties can be set only during PublicIP creation.
 *
 * @summary the operation to create or update a publicIPAddress. Please note some properties can be set only during PublicIP creation.
 * x-ms-original-file: 2026-04-01-preview/PublicIPAddresses_CreateOrUpdate.json
 */
async function createPublicIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("testrg", "public-ip1", {
    location: "eastus",
    properties: {
      publicIPAddressVersion: "IPv4",
      ipAddress: "10.100.100.4",
      ipAllocationScope:
        "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.AzureStackHCI/logicalNetworks/lnet1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createPublicIPAddress();
}

main().catch(console.error);
