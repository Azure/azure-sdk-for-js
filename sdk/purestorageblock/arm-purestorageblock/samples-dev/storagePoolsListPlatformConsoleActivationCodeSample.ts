// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a one-time activation code for platform console access to the storage pool
 *
 * @summary returns a one-time activation code for platform console access to the storage pool
 * x-ms-original-file: 2026-05-01-preview/StoragePools_ListPlatformConsoleActivationCode_MaximumSet_Gen.json
 */
async function storagePoolsListPlatformConsoleActivationCode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.listPlatformConsoleActivationCode(
    "rgpurestorage",
    "storagepool-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsListPlatformConsoleActivationCode();
}

main().catch(console.error);
