// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the status of the storage pool connection to AVS
 *
 * @summary returns the status of the storage pool connection to AVS
 * x-ms-original-file: 2026-01-01-preview/StoragePools_GetAvsStatus_MaximumSet_Gen.json
 */
async function storagePoolsGetAvsStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getAvsStatus("rgpurestorage", "storagepool-01");
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsGetAvsStatus();
}

main().catch(console.error);
