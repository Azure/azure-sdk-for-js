// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update an inbound rule. Please note some properties can be set only during inbound rule creation.
 *
 * @summary the operation to create or update an inbound rule. Please note some properties can be set only during inbound rule creation.
 * x-ms-original-file: 2026-04-01-preview/InboundRules_CreateOrUpdate.json
 */
async function createOrUpdateInboundRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.inboundRules.createOrUpdate(
    "test-rg",
    "test-nat-gw",
    "sample-inbound-rule",
    {
      extendedLocation: {
        name: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        protocol: "Tcp",
        frontendPort: 3389,
        backendPort: 3389,
        backendIPConfiguration: {
          resourceId:
            "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/test-rg/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic/ipConfigurations/ipconfig1",
        },
        publicIPAddress: {
          resourceId:
            "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/test-rg/providers/Microsoft.AzureStackHCI/publicIPAddresses/test-public-ip",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateInboundRule();
}

main().catch(console.error);
