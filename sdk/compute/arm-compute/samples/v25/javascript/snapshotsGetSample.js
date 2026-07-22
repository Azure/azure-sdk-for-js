// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a snapshot.
 *
 * @summary gets information about a snapshot.
 * x-ms-original-file: 2026-03-02/snapshotExamples/Snapshot_Get.json
 */
async function getInformationAboutASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.get("myResourceGroup", "mySnapshot");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a snapshot.
 *
 * @summary gets information about a snapshot.
 * x-ms-original-file: 2026-03-02/snapshotExamples/Snapshot_GetIncrementalSnapshot.json
 */
async function getInformationAboutAnIncrementalSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.get("myResourceGroup", "myIncrementalSnapshot");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a snapshot.
 *
 * @summary gets information about a snapshot.
 * x-ms-original-file: 2026-03-02/snapshotExamples/Snapshot_Get_WithConfidentialVMVersion.json
 */
async function getInformationAboutAConfidentialVMSnapshotWithConfidentialVMVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.snapshots.get("myResourceGroup", "myConfidentialSnapshot");
  console.log(result);
}

async function main() {
  await getInformationAboutASnapshot();
  await getInformationAboutAnIncrementalSnapshot();
  await getInformationAboutAConfidentialVMSnapshotWithConfidentialVMVersion();
}

main().catch(console.error);
