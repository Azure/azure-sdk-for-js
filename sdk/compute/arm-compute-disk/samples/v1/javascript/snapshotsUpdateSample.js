// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates (patches) a snapshot.
 *
 * @summary updates (patches) a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Update.json
 */
async function updateASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.snapshots.update("myResourceGroup", "mySnapshot", {
    properties: { diskSizeGB: 20 },
    tags: { department: "Development", project: "UpdateSnapshots" },
  });
}

/**
 * This sample demonstrates how to updates (patches) a snapshot.
 *
 * @summary updates (patches) a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Update_WithAcceleratedNetwork.json
 */
async function updateASnapshotWithAcceleratedNetworking() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.snapshots.update("myResourceGroup", "mySnapshot", {
    properties: {
      diskSizeGB: 20,
      supportedCapabilities: { acceleratedNetwork: false },
    },
    tags: { department: "Development", project: "UpdateSnapshots" },
  });
}

async function main() {
  await updateASnapshot();
  await updateASnapshotWithAcceleratedNetworking();
}

main().catch(console.error);
