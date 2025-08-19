// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerExecRequest } from "@azure/arm-containerinstance";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Executes a command for a specific container instance in a specified resource group and container group.
 *
 * @summary Executes a command for a specific container instance in a specified resource group and container group.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerExec.json
 */
async function containerExec(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerName = "container1";
  const containerExecRequest: ContainerExecRequest = {
    command: "/bin/bash",
    terminalSize: { cols: 12, rows: 12 },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.executeCommand(
    resourceGroupName,
    containerGroupName,
    containerName,
    containerExecRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerExec();
}

main().catch(console.error);
