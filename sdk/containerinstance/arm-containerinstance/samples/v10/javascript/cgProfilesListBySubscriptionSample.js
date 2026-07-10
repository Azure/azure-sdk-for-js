// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all container group profiles under a subscription.
 *
 * @summary gets a list of all container group profiles under a subscription.
 * x-ms-original-file: 2026-07-01/ContainerGroupProfilesList.json
 */
async function containerGroupProfilesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cgProfiles.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containerGroupProfilesList();
}

main().catch(console.error);
