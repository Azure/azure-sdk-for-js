// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a link to download the run logs.
 *
 * @summary gets a link to download the run logs.
 * x-ms-original-file: 2025-03-01-preview/RunsGetLogSasUrl.json
 */
async function runsGetLogSasUrl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.runs.getLogSasUrl(
    "myResourceGroup",
    "myRegistry",
    "0accec26-d6de-4757-8e74-d080f38eaaab",
  );
  console.log(result);
}

async function main() {
  await runsGetLogSasUrl();
}

main().catch(console.error);
