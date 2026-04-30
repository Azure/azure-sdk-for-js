// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all shared keys of VpnLink connection specified.
 *
 * @summary Lists all shared keys of VpnLink connection specified.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnSiteLinkConnectionSharedKeysGet.json
 */
async function vpnSiteLinkConnectionSharedKeysGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const connectionName = "vpnConnection1";
  const linkConnectionName = "Connection-Link1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnLinkConnections.listAllSharedKeys(
    resourceGroupName,
    gatewayName,
    connectionName,
    linkConnectionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await vpnSiteLinkConnectionSharedKeysGet();
}

main().catch(console.error);
