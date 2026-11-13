// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops all containers in a container group. Compute resources will be deallocated and billing will stop.
 *
 * @summary stops all containers in a container group. Compute resources will be deallocated and billing will stop.
 * x-ms-original-file: 2026-07-01/ContainerGroupsStop.json
 */
async function containerStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.containerGroups.stop("demo", "demo1");
}

async function main(): Promise<void> {
  await containerStop();
}

main().catch(console.error);
