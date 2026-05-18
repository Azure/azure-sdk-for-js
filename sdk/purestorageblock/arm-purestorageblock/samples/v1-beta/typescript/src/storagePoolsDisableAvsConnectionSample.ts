// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disable the existing AVS connection
 *
 * @summary disable the existing AVS connection
 * x-ms-original-file: 2026-01-01-preview/StoragePools_DisableAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsDisableAvsConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.disableAvsConnection("rgpurestorage", "storagepool-01");
}

async function main(): Promise<void> {
  await storagePoolsDisableAvsConnection();
}

main().catch(console.error);
