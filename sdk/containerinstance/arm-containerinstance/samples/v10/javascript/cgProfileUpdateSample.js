// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a specified container group profile.
 *
 * @summary update a specified container group profile.
 * x-ms-original-file: 2026-07-01/ContainerGroupProfilesPatch.json
 */
async function containerGroupProfilesPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.update("demoResource", "demo1", {
    tags: { tag1key: "tag1Value", tag2key: "tag2Value" },
  });
  console.log(result);
}

async function main() {
  await containerGroupProfilesPatch();
}

main().catch(console.error);
