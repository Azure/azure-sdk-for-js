// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance
 *
 * @summary test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance
 * x-ms-original-file: 2026-01-01-preview/StoragePools_RepairAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsRepairAvsConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.repairAvsConnection("rgpurestorage", "storagepool-01");
}

async function main() {
  await storagePoolsRepairAvsConnection();
}

main().catch(console.error);
