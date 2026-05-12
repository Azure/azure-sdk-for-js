// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a snapshot. Please note some properties can be set only during snapshot creation.
 *
 * @summary the operation to create or update a snapshot. Please note some properties can be set only during snapshot creation.
 * x-ms-original-file: 2026-04-01-preview/Snapshots_CreateOrUpdate.json
 */
async function createOrUpdateASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("test-rg", "test-snapshot", {
    extendedLocation: {
      name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    location: "West US2",
    tags: { environment: "test" },
    properties: {
      creationData: {
        createOption: "Copy",
        sourceResourceId:
          "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/test-rg/providers/Microsoft.AzureStackHCI/virtualHardDisks/source-vhd",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASnapshot();
}

main().catch(console.error);
