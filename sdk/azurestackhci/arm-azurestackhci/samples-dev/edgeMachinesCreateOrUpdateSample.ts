// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an edge machine.
 *
 * @summary create or update an edge machine.
 * x-ms-original-file: 2025-12-01-preview/EdgeMachines_CreateOrUpdate.json
 */
async function edgeMachinesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachines.createOrUpdate("ArcInstance-rg", "machine-1", {
    properties: {
      arcMachineResourceGroupId:
        "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg",
      arcMachineResourceId:
        "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachinesCreateOrUpdate();
}

main().catch(console.error);
