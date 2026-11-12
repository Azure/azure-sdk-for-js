// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops all container groups in the specified NGroups resource. Compute resources will be deallocated and billing will stop.
 *
 * @summary stops all container groups in the specified NGroups resource. Compute resources will be deallocated and billing will stop.
 * x-ms-original-file: 2026-07-01/NGroupsStop.json
 */
async function nGroupsStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.nGroups.stop("demo", "demo-ngroup");
}

async function main() {
  await nGroupsStop();
}

main().catch(console.error);
