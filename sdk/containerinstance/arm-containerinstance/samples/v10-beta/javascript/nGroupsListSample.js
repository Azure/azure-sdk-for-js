// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all NGroups resources under a subscription.
 *
 * @summary gets a list of all NGroups resources under a subscription.
 * x-ms-original-file: 2026-06-01-preview/NGroupsList.json
 */
async function nGroupsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nGroups.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nGroupsList();
}

main().catch(console.error);
