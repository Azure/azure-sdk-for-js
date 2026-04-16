// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection.
 *
 * @summary Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnSiteLinkConnectionList.json
 */
async function vpnSiteLinkConnectionList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const connectionName = "vpnConnection1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnLinkConnections.listByVpnConnection(
    resourceGroupName,
    gatewayName,
    connectionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await vpnSiteLinkConnectionList();
}

main().catch(console.error);
