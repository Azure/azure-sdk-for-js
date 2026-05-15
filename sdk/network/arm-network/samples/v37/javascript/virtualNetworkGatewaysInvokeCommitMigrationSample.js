// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger commit migration for the virtual network gateway.
 *
 * @summary trigger commit migration for the virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayCommitMigration.json
 */
async function virtualNetworkGatewayCommitMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.invokeCommitMigration("rg1", "vpngw");
}

async function main() {
  await virtualNetworkGatewayCommitMigration();
}

main().catch(console.error);
