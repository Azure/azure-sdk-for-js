// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a virtual wan p2s vpn gateway.
 *
 * @summary retrieves the details of a virtual wan p2s vpn gateway.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayGet.json
 */
async function p2SVpnGatewayGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.get("rg1", "p2sVpnGateway1");
  console.log(result);
}

async function main() {
  await p2SVpnGatewayGet();
}

main().catch(console.error);
