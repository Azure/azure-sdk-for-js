// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a snapshot.
 *
 * @summary deletes a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Delete.json
 */
async function deleteASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.snapshots.delete("myResourceGroup", "mySnapshot");
}

async function main() {
  await deleteASnapshot();
}

main().catch(console.error);
