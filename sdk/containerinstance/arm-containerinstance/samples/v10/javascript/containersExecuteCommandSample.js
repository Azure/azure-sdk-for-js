// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to executes a command for a specific container instance in a specified resource group and container group.
 *
 * @summary executes a command for a specific container instance in a specified resource group and container group.
 * x-ms-original-file: 2026-07-01/ContainerExec.json
 */
async function containerExec() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.executeCommand("demo", "demo1", "container1", {
    command: "/bin/bash",
    terminalSize: { cols: 12, rows: 12 },
  });
  console.log(result);
}

async function main() {
  await containerExec();
}

main().catch(console.error);
