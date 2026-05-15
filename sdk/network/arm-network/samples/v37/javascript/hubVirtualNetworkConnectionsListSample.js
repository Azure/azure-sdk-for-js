// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of all HubVirtualNetworkConnections.
 *
 * @summary retrieves the details of all HubVirtualNetworkConnections.
 * x-ms-original-file: 2025-05-01/HubVirtualNetworkConnectionList.json
 */
async function hubVirtualNetworkConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hubVirtualNetworkConnections.list("rg1", "virtualHub1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await hubVirtualNetworkConnectionList();
}

main().catch(console.error);
