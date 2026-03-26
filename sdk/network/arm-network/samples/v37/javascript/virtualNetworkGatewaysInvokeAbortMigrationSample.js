// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger abort migration for the virtual network gateway.
 *
 * @summary trigger abort migration for the virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayAbortMigration.json
 */
async function virtualNetworkGatewayAbortMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.invokeAbortMigration("rg1", "vpngw");
}

async function main() {
  await virtualNetworkGatewayAbortMigration();
}

main().catch(console.error);
