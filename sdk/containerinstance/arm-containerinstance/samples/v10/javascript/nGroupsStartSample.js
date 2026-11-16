// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts all container groups in the specified NGroups resource. Compute resources will be allocated and billing will start.
 *
 * @summary starts all container groups in the specified NGroups resource. Compute resources will be allocated and billing will start.
 * x-ms-original-file: 2026-07-01/NGroupsStart.json
 */
async function nGroupsStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.nGroups.start("demo", "demo-ngroup");
}

async function main() {
  await nGroupsStart();
}

main().catch(console.error);
