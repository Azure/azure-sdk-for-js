// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all Virtual Router Peerings in a Virtual Router resource.
 *
 * @summary Lists all Virtual Router Peerings in a Virtual Router resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualRouterPeeringList.json
 */
async function listAllVirtualRouterPeeringsForAGivenVirtualRouter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualRouterName = "virtualRouter";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualRouterPeerings.list(
    resourceGroupName,
    virtualRouterName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllVirtualRouterPeeringsForAGivenVirtualRouter();
}

main().catch(console.error);
