// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/StorageMovers_Update.json
 */
async function storageMoversUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.storageMovers.update("examples-rg", "examples-storageMoverName", {
    properties: { description: "Updated Storage Mover Description" },
  });
  console.log(result);
}

async function main() {
  await storageMoversUpdate();
}

main().catch(console.error);
