// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified volume group only if there are no volumes under volume group.
 *
 * @summary delete the specified volume group only if there are no volumes under volume group.
 * x-ms-original-file: 2025-09-01-preview/VolumeGroups_Delete.json
 */
async function volumeGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumeGroups.delete("myRG", "account1", "group1");
}

async function main(): Promise<void> {
  await volumeGroupsDelete();
}

main().catch(console.error);
