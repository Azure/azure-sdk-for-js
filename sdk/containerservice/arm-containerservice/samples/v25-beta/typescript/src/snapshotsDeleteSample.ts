// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a snapshot.
 *
 * @summary deletes a snapshot.
 * x-ms-original-file: 2025-10-02-preview/SnapshotsDelete.json
 */
async function deleteSnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.snapshots.delete("rg1", "snapshot1");
}

async function main(): Promise<void> {
  await deleteSnapshot();
}

main().catch(console.error);
