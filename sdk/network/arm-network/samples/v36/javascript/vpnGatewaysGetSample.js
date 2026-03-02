// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the details of a virtual wan vpn gateway.
 *
 * @summary Retrieves the details of a virtual wan vpn gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnGatewayGet.json
 */
async function vpnGatewayGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnGateways.get(resourceGroupName, gatewayName);
  console.log(result);
}

async function main() {
  await vpnGatewayGet();
}

main().catch(console.error);
