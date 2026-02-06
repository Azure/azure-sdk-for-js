// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a managed cluster snapshot.
 *
 * @summary deletes a managed cluster snapshot.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsDelete.json
 */
async function deleteManagedClusterSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusterSnapshots.delete("rg1", "snapshot1");
}

async function main() {
  await deleteManagedClusterSnapshot();
}

main().catch(console.error);
