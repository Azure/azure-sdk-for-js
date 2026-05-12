// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a natGateway. Please note some properties can be set only during NatGateway creation.
 *
 * @summary the operation to create or update a natGateway. Please note some properties can be set only during NatGateway creation.
 * x-ms-original-file: 2026-04-01-preview/NatGateways_CreateOrUpdate.json
 */
async function putNatGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.natGateways.createOrUpdate("test-rg", "test-nat-gw", {
    extendedLocation: {
      name: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    properties: {
      publicIPAddresses: [
        {
          resourceId:
            "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/azure-local-rg/providers/Microsoft.AzureStackHCI/publicIPAddresses/outbound-pip",
        },
      ],
    },
    location: "West US2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putNatGateway();
}

main().catch(console.error);
