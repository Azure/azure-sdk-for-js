// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a storage pool
 *
 * @summary delete a storage pool
 * x-ms-original-file: 2024-11-01/StoragePools_Delete_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function storagePoolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.delete("rgpurestorage", "storagePoolname");
}

async function main(): Promise<void> {
  await storagePoolsDelete();
}

main().catch(console.error);
