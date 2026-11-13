// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts all containers in a container group in place. If container image has updates, new image will be downloaded.
 *
 * @summary restarts all containers in a container group in place. If container image has updates, new image will be downloaded.
 * x-ms-original-file: 2026-07-01/ContainerGroupsRestart.json
 */
async function containerRestart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.containerGroups.restart("demo", "demo1");
}

async function main(): Promise<void> {
  await containerRestart();
}

main().catch(console.error);
