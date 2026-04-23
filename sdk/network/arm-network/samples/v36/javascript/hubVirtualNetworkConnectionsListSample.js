// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the details of all HubVirtualNetworkConnections.
 *
 * @summary Retrieves the details of all HubVirtualNetworkConnections.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/HubVirtualNetworkConnectionList.json
 */
async function hubVirtualNetworkConnectionList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hubVirtualNetworkConnections.list(
    resourceGroupName,
    virtualHubName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await hubVirtualNetworkConnectionList();
}

main().catch(console.error);
