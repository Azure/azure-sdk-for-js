// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a volume
 *
 * @summary delete a volume
 * x-ms-original-file: 2026-01-01-preview/Volumes_Delete_MaximumSet_Gen.json
 */
async function volumesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.volumes.delete("rgpurestorage", "storagepool-01", "volumegroup-01", "volume-01");
}

async function main() {
  await volumesDelete();
}

main().catch(console.error);
