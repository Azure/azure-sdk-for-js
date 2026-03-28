// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a xml format representation for supported vpn devices.
 *
 * @summary gets a xml format representation for supported vpn devices.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewaySupportedVpnDevice.json
 */
async function listVirtualNetworkGatewaySupportedVPNDevices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.supportedVpnDevices("rg1", "vpngw");
  console.log(result);
}

async function main() {
  await listVirtualNetworkGatewaySupportedVPNDevices();
}

main().catch(console.error);
