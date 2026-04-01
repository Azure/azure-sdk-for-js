// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to displays NetworkMonitors list by subscription GET method.
 *
 * @summary displays NetworkMonitors list by subscription GET method.
 * x-ms-original-file: 2025-07-15/NetworkMonitors_ListBySubscription.json
 */
async function networkMonitorsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkMonitors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkMonitorsListBySubscription();
}

main().catch(console.error);
