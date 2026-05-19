// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve health metrics of a storage pool
 *
 * @summary retrieve health metrics of a storage pool
 * x-ms-original-file: 2026-01-01-preview/StoragePools_GetHealthStatus_MaximumSet_Gen.json
 */
async function storagePoolsGetHealthStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getHealthStatus("rgpurestorage", "storagepool-01");
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsGetHealthStatus();
}

main().catch(console.error);
