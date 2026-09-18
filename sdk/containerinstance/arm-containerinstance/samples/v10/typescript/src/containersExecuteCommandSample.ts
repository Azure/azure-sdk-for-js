// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to executes a command for a specific container instance in a specified resource group and container group.
 *
 * @summary executes a command for a specific container instance in a specified resource group and container group.
 * x-ms-original-file: 2026-07-01/ContainerExec.json
 */
async function containerExec(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.executeCommand("demo", "demo1", "container1", {
    command: "/bin/bash",
    terminalSize: { cols: 12, rows: 12 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await containerExec();
}

main().catch(console.error);
