// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a top-level Storage Mover resource.
 *
 * @summary creates or updates a top-level Storage Mover resource.
 * x-ms-original-file: 2025-07-01/StorageMovers_CreateOrUpdate.json
 */
async function storageMoversCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.storageMovers.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    {
      location: "eastus2",
      properties: { description: "Example Storage Mover Description" },
      tags: { key1: "value1", key2: "value2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageMoversCreateOrUpdate();
}

main().catch(console.error);
