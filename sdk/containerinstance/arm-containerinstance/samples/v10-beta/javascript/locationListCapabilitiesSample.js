// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of CPU/memory/GPU capabilities of a region.
 *
 * @summary get the list of CPU/memory/GPU capabilities of a region.
 * x-ms-original-file: 2026-06-01-preview/CapabilitiesList.json
 */
async function getCapabilities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listCapabilities("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getCapabilities();
}

main().catch(console.error);
