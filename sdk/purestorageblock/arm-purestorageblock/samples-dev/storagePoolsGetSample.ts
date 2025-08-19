// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a storage pool
 *
 * @summary get a storage pool
 * x-ms-original-file: 2024-11-01/StoragePools_Get_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function storagePoolsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.get("rgpurestorage", "storagePoolname");
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsGet();
}

main().catch(console.error);
