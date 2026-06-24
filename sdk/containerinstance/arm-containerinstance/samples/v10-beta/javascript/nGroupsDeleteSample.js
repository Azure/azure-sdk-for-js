// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the NGroups resource.
 *
 * @summary deletes the NGroups resource.
 * x-ms-original-file: 2026-06-01-preview/NGroupsDelete.json
 */
async function nGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.nGroups.delete("demo", "demo-ngroup");
}

async function main() {
  await nGroupsDelete();
}

main().catch(console.error);
