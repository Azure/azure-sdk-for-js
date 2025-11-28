// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a snapshot
 *
 * @summary patch a snapshot
 * x-ms-original-file: 2025-09-01-preview/Snapshots_Update.json
 */
async function snapshotsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshots.update(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "snapshot1",
    {},
  );
  console.log(result);
}

async function main() {
  await snapshotsUpdate();
}

main().catch(console.error);
