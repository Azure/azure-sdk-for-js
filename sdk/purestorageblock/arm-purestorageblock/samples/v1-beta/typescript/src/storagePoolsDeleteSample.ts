// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a storage pool
 *
 * @summary delete a storage pool
 * x-ms-original-file: 2026-01-01-preview/StoragePools_Delete_MaximumSet_Gen.json
 */
async function storagePoolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.delete("rgpurestorage", "storagepool-01");
}

async function main(): Promise<void> {
  await storagePoolsDelete();
}

main().catch(console.error);
