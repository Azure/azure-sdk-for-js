// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieve health metrics of a storage pool
 *
 * @summary retrieve health metrics of a storage pool
 * x-ms-original-file: 2024-11-01/StoragePools_GetHealthStatus_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function storagePoolsGetHealthStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getHealthStatus("rgpurestorage", "storagePoolname");
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsGetHealthStatus();
}

main().catch(console.error);
