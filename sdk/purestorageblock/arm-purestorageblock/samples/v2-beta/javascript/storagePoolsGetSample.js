// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a storage pool
 *
 * @summary get a storage pool
 * x-ms-original-file: 2026-01-01-preview/StoragePools_Get_MaximumSet_Gen.json
 */
async function storagePoolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.get("rgpurestorage", "storagepool-01");
  console.log(result);
}

async function main() {
  await storagePoolsGet();
}

main().catch(console.error);
