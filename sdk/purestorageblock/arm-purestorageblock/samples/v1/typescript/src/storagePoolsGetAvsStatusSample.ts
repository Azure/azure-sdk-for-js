// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the status of the storage pool connection to AVS
 *
 * @summary returns the status of the storage pool connection to AVS
 * x-ms-original-file: 2024-11-01/StoragePools_GetAvsStatus_MaximumSet_Gen.json
 */
async function storagePoolsGetAvsStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getAvsStatus("rgpurestorage", "storagePoolname");
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsGetAvsStatus();
}

main().catch(console.error);
