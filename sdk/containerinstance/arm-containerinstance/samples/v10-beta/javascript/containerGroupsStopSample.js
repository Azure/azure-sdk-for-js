// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops all containers in a container group. Compute resources will be deallocated and billing will stop.
 *
 * @summary stops all containers in a container group. Compute resources will be deallocated and billing will stop.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupsStop.json
 */
async function containerStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.containerGroups.stop("demo", "demo1");
}

async function main() {
  await containerStop();
}

main().catch(console.error);
