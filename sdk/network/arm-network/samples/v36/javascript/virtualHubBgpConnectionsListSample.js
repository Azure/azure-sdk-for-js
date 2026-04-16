// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the details of all VirtualHubBgpConnections.
 *
 * @summary Retrieves the details of all VirtualHubBgpConnections.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualHubBgpConnectionList.json
 */
async function virtualHubRouteTableV2List() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "hub1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualHubBgpConnections.list(
    resourceGroupName,
    virtualHubName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await virtualHubRouteTableV2List();
}

main().catch(console.error);
