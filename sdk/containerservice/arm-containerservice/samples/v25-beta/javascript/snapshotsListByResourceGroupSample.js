// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists snapshots in the specified subscription and resource group.
 *
 * @summary lists snapshots in the specified subscription and resource group.
 * x-ms-original-file: 2025-10-02-preview/SnapshotsListByResourceGroup.json
 */
async function listSnapshotsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.snapshots.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSnapshotsByResourceGroup();
}

main().catch(console.error);
