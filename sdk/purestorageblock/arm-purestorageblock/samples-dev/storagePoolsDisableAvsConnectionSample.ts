// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to disable the existing AVS connection
 *
 * @summary disable the existing AVS connection
 * x-ms-original-file: 2024-11-01/StoragePools_DisableAvsConnection_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function storagePoolsDisableAvsConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.disableAvsConnection("rgpurestorage", "storagePoolname");
}

async function main(): Promise<void> {
  await storagePoolsDisableAvsConnection();
}

main().catch(console.error);
