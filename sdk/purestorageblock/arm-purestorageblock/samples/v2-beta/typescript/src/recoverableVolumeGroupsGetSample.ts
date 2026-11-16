// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a recoverable volume group
 *
 * @summary get a recoverable volume group
 * x-ms-original-file: 2026-05-01-preview/RecoverableVolumeGroups_Get_MaximumSet_Gen.json
 */
async function recoverableVolumeGroupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.recoverableVolumeGroups.get(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoverableVolumeGroupsGet();
}

main().catch(console.error);
