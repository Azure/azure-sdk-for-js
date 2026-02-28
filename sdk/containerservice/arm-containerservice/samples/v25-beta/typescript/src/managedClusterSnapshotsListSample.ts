// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of managed cluster snapshots in the specified subscription.
 *
 * @summary gets a list of managed cluster snapshots in the specified subscription.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsList.json
 */
async function listManagedClusterSnapshots(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusterSnapshots.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedClusterSnapshots();
}

main().catch(console.error);
