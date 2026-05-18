// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a storage pool
 *
 * @summary update a storage pool
 * x-ms-original-file: 2026-01-01-preview/StoragePools_Update_MaximumSet_Gen.json
 */
async function storagePoolsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.update("rgpurestorage", "storagepool-01", {
    identity: { type: "None", userAssignedIdentities: { "identity-01": {} } },
    tags: { key9065: "ebgRead Storage Poolswxqewe" },
    properties: { provisionedBandwidthMbPerSec: 23 },
  });
  console.log(result);
}

async function main() {
  await storagePoolsUpdate();
}

main().catch(console.error);
