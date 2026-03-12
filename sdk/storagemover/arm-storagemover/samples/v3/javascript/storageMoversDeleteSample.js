// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Storage Mover resource.
 *
 * @summary deletes a Storage Mover resource.
 * x-ms-original-file: 2025-07-01/StorageMovers_Delete.json
 */
async function storageMoversDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  await client.storageMovers.delete("examples-rg", "examples-storageMoverName");
}

async function main() {
  await storageMoversDelete();
}

main().catch(console.error);
