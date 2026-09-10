// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to eradicate a recoverable volume group
 *
 * @summary eradicate a recoverable volume group
 * x-ms-original-file: 2026-05-01-preview/RecoverableVolumeGroups_Delete_MaximumSet_Gen.json
 */
async function recoverableVolumeGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.recoverableVolumeGroups.delete("rgpurestorage", "storagepool-01", "volumegroup-01");
}

async function main(): Promise<void> {
  await recoverableVolumeGroupsDelete();
}

main().catch(console.error);
