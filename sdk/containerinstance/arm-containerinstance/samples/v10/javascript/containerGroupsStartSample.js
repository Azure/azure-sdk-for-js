// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts all containers in a container group. Compute resources will be allocated and billing will start.
 *
 * @summary starts all containers in a container group. Compute resources will be allocated and billing will start.
 * x-ms-original-file: 2026-07-01/ContainerGroupsStart.json
 */
async function containerStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.containerGroups.start("demo", "demo1");
}

async function main() {
  await containerStart();
}

main().catch(console.error);
