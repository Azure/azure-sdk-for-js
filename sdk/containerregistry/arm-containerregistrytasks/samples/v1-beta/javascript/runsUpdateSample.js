// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the run properties.
 *
 * @summary patch the run properties.
 * x-ms-original-file: 2025-03-01-preview/RunsUpdate.json
 */
async function runsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.runs.update(
    "myResourceGroup",
    "myRegistry",
    "0accec26-d6de-4757-8e74-d080f38eaaab",
    { isArchiveEnabled: true },
  );
  console.log(result);
}

async function main() {
  await runsUpdate();
}

main().catch(console.error);
