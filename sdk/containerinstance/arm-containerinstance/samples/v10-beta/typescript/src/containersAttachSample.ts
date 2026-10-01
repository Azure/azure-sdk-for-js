// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to attach to the output stream of a specific container instance in a specified resource group and container group.
 *
 * @summary attach to the output stream of a specific container instance in a specified resource group and container group.
 * x-ms-original-file: 2026-06-01-preview/ContainerAttach.json
 */
async function containerAttach(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.attach("demo", "demo1", "container1");
  console.log(result);
}

async function main(): Promise<void> {
  await containerAttach();
}

main().catch(console.error);
