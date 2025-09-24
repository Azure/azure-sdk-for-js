// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates (patches) a snapshot.
 *
 * @summary Updates (patches) a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/snapshotExamples/Snapshot_Update_WithAcceleratedNetwork.json
 */

import { SnapshotUpdate, ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateASnapshotWithAcceleratedNetworking(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const snapshotName = "mySnapshot";
  const snapshot: SnapshotUpdate = {
    diskSizeGB: 20,
    supportedCapabilities: { acceleratedNetwork: false },
    tags: { department: "Development", project: "UpdateSnapshots" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.beginUpdateAndWait(
    resourceGroupName,
    snapshotName,
    snapshot,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a snapshot.
 *
 * @summary Updates (patches) a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/snapshotExamples/Snapshot_Update.json
 */
async function updateASnapshot(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const snapshotName = "mySnapshot";
  const snapshot: SnapshotUpdate = {
    diskSizeGB: 20,
    tags: { department: "Development", project: "UpdateSnapshots" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.beginUpdateAndWait(
    resourceGroupName,
    snapshotName,
    snapshot,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateASnapshotWithAcceleratedNetworking();
  await updateASnapshot();
}

main().catch(console.error);
