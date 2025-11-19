// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists snapshots under a resource group.
 *
 * @summary lists snapshots under a resource group.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_ListByResourceGroup.json
 */
async function listAllSnapshotsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.snapshots.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllSnapshotsInAResourceGroup();
}

main().catch(console.error);
