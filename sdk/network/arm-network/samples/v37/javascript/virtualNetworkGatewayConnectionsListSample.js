// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways connections created.
 *
 * @summary the List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways connections created.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionsList.json
 */
async function listVirtualNetworkGatewayConnectionsinResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkGatewayConnections.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualNetworkGatewayConnectionsinResourceGroup();
}

main().catch(console.error);
