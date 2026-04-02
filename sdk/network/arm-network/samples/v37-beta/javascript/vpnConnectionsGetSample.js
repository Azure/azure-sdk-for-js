// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a vpn connection.
 *
 * @summary retrieves the details of a vpn connection.
 * x-ms-original-file: 2025-05-01/VpnConnectionGet.json
 */
async function vpnConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.get("rg1", "gateway1", "vpnConnection1");
  console.log(result);
}

async function main() {
  await vpnConnectionGet();
}

main().catch(console.error);
