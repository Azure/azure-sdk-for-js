// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger commit migration for the virtual network gateway.
 *
 * @summary trigger commit migration for the virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayCommitMigration.json
 */
async function virtualNetworkGatewayCommitMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.invokeCommitMigration("rg1", "vpngw");
}

async function main(): Promise<void> {
  await virtualNetworkGatewayCommitMigration();
}

main().catch(console.error);
