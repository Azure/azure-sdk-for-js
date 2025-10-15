// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to revokes access to a snapshot.
 *
 * @summary revokes access to a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_EndGetAccess.json
 */
async function revokeAccessToASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.snapshots.revokeAccess("myResourceGroup", "mySnapshot");
  console.log(result);
}

async function main() {
  await revokeAccessToASnapshot();
}

main().catch(console.error);
