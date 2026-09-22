// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates container group tags with specified values.
 *
 * @summary updates container group tags with specified values.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupsUpdate.json
 */
async function containerGroupsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.update("demoResource", "demo1", {
    tags: { tag1key: "tag1Value", tag2key: "tag2Value" },
  });
  console.log(result);
}

async function main() {
  await containerGroupsUpdate();
}

main().catch(console.error);
