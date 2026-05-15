// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list network usages for a subscription.
 *
 * @summary list network usages for a subscription.
 * x-ms-original-file: 2025-05-01/UsageList.json
 */
async function listUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list network usages for a subscription.
 *
 * @summary list network usages for a subscription.
 * x-ms-original-file: 2025-05-01/UsageListSpacedLocation.json
 */
async function listUsagesSpacedLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("West US")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUsages();
  await listUsagesSpacedLocation();
}

main().catch(console.error);
