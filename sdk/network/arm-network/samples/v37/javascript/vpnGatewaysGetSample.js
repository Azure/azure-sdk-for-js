// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a virtual wan vpn gateway.
 *
 * @summary retrieves the details of a virtual wan vpn gateway.
 * x-ms-original-file: 2025-05-01/VpnGatewayGet.json
 */
async function vpnGatewayGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnGateways.get("rg1", "gateway1");
  console.log(result);
}

async function main() {
  await vpnGatewayGet();
}

main().catch(console.error);
