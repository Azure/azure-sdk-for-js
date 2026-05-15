// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all network watchers by resource group.
 *
 * @summary gets all network watchers by resource group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherList.json
 */
async function listNetworkWatchers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkWatchers.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNetworkWatchers();
}

main().catch(console.error);
