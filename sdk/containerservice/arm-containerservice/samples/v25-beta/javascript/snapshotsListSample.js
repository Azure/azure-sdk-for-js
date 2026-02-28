// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of snapshots in the specified subscription.
 *
 * @summary gets a list of snapshots in the specified subscription.
 * x-ms-original-file: 2025-10-02-preview/SnapshotsList.json
 */
async function listSnapshots() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.snapshots.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSnapshots();
}

main().catch(console.error);
