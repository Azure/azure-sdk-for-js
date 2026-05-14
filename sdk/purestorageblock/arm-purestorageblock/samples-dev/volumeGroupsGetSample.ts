// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a volume group
 *
 * @summary get a volume group
 * x-ms-original-file: 2026-01-01-preview/VolumeGroups_Get_MaximumSet_Gen.json
 */
async function volumeGroupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroups.get("rgpurestorage", "storagepool-01", "volumegroup-01");
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsGet();
}

main().catch(console.error);
