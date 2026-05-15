// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger prepare migration for the virtual network gateway.
 *
 * @summary trigger prepare migration for the virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayPrepareMigration.json
 */
async function virtualNetworkGatewayPrepareMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.invokePrepareMigration("rg1", "vpngw", {
    migrationType: "UpgradeDeploymentToStandardIP",
    resourceUrl: "testUrl",
  });
}

async function main(): Promise<void> {
  await virtualNetworkGatewayPrepareMigration();
}

main().catch(console.error);
