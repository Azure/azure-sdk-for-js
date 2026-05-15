// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger abort migration for the virtual network gateway.
 *
 * @summary trigger abort migration for the virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayAbortMigration.json
 */
async function virtualNetworkGatewayAbortMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.invokeAbortMigration("rg1", "vpngw");
}

async function main(): Promise<void> {
  await virtualNetworkGatewayAbortMigration();
}

main().catch(console.error);
