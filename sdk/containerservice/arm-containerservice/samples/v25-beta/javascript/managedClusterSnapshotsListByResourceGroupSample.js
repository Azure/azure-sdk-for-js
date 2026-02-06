// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists managed cluster snapshots in the specified subscription and resource group.
 *
 * @summary lists managed cluster snapshots in the specified subscription and resource group.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsListByResourceGroup.json
 */
async function listManagedClusterSnapshotsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusterSnapshots.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedClusterSnapshotsByResourceGroup();
}

main().catch(console.error);
