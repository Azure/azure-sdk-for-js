// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete snapshot
 *
 * @summary delete snapshot
 * x-ms-original-file: 2025-09-01-preview/Snapshots_Delete.json
 */
async function snapshotsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.snapshots.delete("myRG", "account1", "pool1", "volume1", "snapshot1");
}

async function main() {
  await snapshotsDelete();
}

main().catch(console.error);
