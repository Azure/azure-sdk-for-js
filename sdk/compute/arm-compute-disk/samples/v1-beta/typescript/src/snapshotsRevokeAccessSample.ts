// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revokes access to a snapshot.
 *
 * @summary revokes access to a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_EndGetAccess.json
 */
async function revokeAccessToASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.revokeAccess("myResourceGroup", "mySnapshot");
}

async function main(): Promise<void> {
  await revokeAccessToASnapshot();
}

main().catch(console.error);
