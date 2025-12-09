// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified volume group only if there are no volumes under volume group.
 *
 * @summary delete the specified volume group only if there are no volumes under volume group.
 * x-ms-original-file: 2025-09-01-preview/VolumeGroups_Delete.json
 */
async function volumeGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumeGroups.delete("myRG", "account1", "group1");
}

async function main() {
  await volumeGroupsDelete();
}

main().catch(console.error);
