// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to initiate a connection between the storage pool and a specified AVS SDDC resource
 *
 * @summary initiate a connection between the storage pool and a specified AVS SDDC resource
 * x-ms-original-file: 2024-11-01/StoragePools_EnableAvsConnection_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function storagePoolsEnableAvsConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.enableAvsConnection("rgpurestorage", "storagePoolname", {
    clusterResourceId: "tghkgktlddwlszbeh",
  });
}

async function main(): Promise<void> {
  await storagePoolsEnableAvsConnection();
}

main().catch(console.error);
