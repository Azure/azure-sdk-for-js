// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SandboxGroup
 *
 * @summary create a SandboxGroup
 * x-ms-original-file: 2026-07-01/SandboxGroupsCreateOrUpdate.json
 */
async function createOrUpdateASandboxGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.sandboxGroups.createOrUpdate("myResourceGroup", "mySandboxGroup", {
    location: "eastus",
    tags: { environment: "test" },
    properties: {
      networkProfile: {
        subnets: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVNet/subnets/mySubnet",
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASandboxGroup();
}

main().catch(console.error);
