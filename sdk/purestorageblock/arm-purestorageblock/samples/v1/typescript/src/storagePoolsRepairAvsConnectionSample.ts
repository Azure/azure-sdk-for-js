// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance
 *
 * @summary test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance
 * x-ms-original-file: 2024-11-01/StoragePools_RepairAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsRepairAvsConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.repairAvsConnection("rgpurestorage", "storagePoolname");
}

async function main(): Promise<void> {
  await storagePoolsRepairAvsConnection();
}

main().catch(console.error);
