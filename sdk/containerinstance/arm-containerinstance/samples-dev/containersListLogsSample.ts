// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the logs for a specified container instance in a specified resource group and container group.
 *
 * @summary get the logs for a specified container instance in a specified resource group and container group.
 * x-ms-original-file: 2026-07-01/ContainerListLogs.json
 */
async function containerListLogs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.listLogs("demo", "demo1", "container1", { tail: 10 });
  console.log(result);
}

async function main(): Promise<void> {
  await containerListLogs();
}

main().catch(console.error);
