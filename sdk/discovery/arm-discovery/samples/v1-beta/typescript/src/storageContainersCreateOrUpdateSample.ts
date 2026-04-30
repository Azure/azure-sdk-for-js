// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a StorageContainer
 *
 * @summary create a StorageContainer
 * x-ms-original-file: 2026-02-01-preview/StorageContainers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function storageContainersCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageContainers.createOrUpdate(
    "rgdiscovery",
    "23ae33a54872c83164",
    {
      properties: {
        storageStore: {
          kind: "AzureStorageBlob",
          storageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Storage/storageAccounts/storageaccount",
        },
      },
      tags: { key9976: "waghigmzxlvfqwribpxamwx" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageContainersCreateOrUpdateMaximumSet();
}

main().catch(console.error);
