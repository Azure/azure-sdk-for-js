// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details of the specified snapshot
 *
 * @summary get details of the specified snapshot
 * x-ms-original-file: 2025-09-01-preview/Snapshots_Get.json
 */
async function snapshotsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshots.get("myRG", "account1", "pool1", "volume1", "snapshot1");
  console.log(result);
}

async function main() {
  await snapshotsGet();
}

main().catch(console.error);
