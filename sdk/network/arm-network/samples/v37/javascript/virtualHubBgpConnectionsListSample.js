// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of all VirtualHubBgpConnections.
 *
 * @summary retrieves the details of all VirtualHubBgpConnections.
 * x-ms-original-file: 2025-05-01/VirtualHubBgpConnectionList.json
 */
async function virtualHubRouteTableV2List() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualHubBgpConnections.list("rg1", "hub1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualHubRouteTableV2List();
}

main().catch(console.error);
