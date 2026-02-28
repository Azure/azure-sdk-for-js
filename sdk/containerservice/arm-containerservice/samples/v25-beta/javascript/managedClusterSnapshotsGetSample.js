// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed cluster snapshot.
 *
 * @summary gets a managed cluster snapshot.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsGet.json
 */
async function getManagedClusterSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusterSnapshots.get("rg1", "snapshot1");
  console.log(result);
}

async function main() {
  await getManagedClusterSnapshot();
}

main().catch(console.error);
