// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a managed cluster snapshot.
 *
 * @summary deletes a managed cluster snapshot.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsDelete.json
 */
async function deleteManagedClusterSnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusterSnapshots.delete("rg1", "snapshot1");
}

async function main(): Promise<void> {
  await deleteManagedClusterSnapshot();
}

main().catch(console.error);
