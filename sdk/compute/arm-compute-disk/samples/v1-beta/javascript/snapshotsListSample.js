// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists snapshots under a subscription.
 *
 * @summary lists snapshots under a subscription.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_ListBySubscription.json
 */
async function listAllSnapshotsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.snapshots.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllSnapshotsInASubscription();
}

main().catch(console.error);
