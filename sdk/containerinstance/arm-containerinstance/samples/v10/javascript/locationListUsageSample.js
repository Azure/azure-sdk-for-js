// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the usage for a subscription
 *
 * @summary get the usage for a subscription
 * x-ms-original-file: 2026-07-01/ContainerGroupUsage.json
 */
async function containerUsage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listUsage("westcentralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containerUsage();
}

main().catch(console.error);
