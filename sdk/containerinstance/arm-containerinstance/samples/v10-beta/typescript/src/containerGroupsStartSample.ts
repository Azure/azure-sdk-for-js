// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts all containers in a container group. Compute resources will be allocated and billing will start.
 *
 * @summary starts all containers in a container group. Compute resources will be allocated and billing will start.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupsStart.json
 */
async function containerStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.containerGroups.start("demo", "demo1");
}

async function main(): Promise<void> {
  await containerStart();
}

main().catch(console.error);
