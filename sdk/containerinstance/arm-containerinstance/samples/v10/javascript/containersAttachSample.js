// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to attach to the output stream of a specific container instance in a specified resource group and container group.
 *
 * @summary attach to the output stream of a specific container instance in a specified resource group and container group.
 * x-ms-original-file: 2026-07-01/ContainerAttach.json
 */
async function containerAttach() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.attach("demo", "demo1", "container1");
  console.log(result);
}

async function main() {
  await containerAttach();
}

main().catch(console.error);
