// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a volume group
 *
 * @summary delete a volume group
 * x-ms-original-file: 2026-01-01-preview/VolumeGroups_Delete_MaximumSet_Gen.json
 */
async function volumeGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.volumeGroups.delete("rgpurestorage", "storagepool-01", "volumegroup-01");
}

async function main(): Promise<void> {
  await volumeGroupsDelete();
}

main().catch(console.error);
