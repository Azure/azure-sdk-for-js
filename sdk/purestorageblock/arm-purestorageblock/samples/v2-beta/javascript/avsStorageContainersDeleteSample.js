// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an AVS storage container
 *
 * @summary delete an AVS storage container
 * x-ms-original-file: 2026-01-01-preview/AvsStorageContainers_Delete_MaximumSet_Gen.json
 */
async function avsStorageContainersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsStorageContainers.delete("rgpurestorage", "storagepool-01", "container-01");
}

async function main() {
  await avsStorageContainersDelete();
}

main().catch(console.error);
