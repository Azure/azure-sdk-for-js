// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the logs for a specified container instance in a specified resource group and container group.
 *
 * @summary get the logs for a specified container instance in a specified resource group and container group.
 * x-ms-original-file: 2026-06-01-preview/ContainerListLogs.json
 */
async function containerListLogs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.listLogs("demo", "demo1", "container1", { tail: 10 });
  console.log(result);
}

async function main() {
  await containerListLogs();
}

main().catch(console.error);
