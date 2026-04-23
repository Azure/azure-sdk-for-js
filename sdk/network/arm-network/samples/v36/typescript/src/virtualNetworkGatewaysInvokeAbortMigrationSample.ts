// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Trigger abort migration for the virtual network gateway.
 *
 * @summary Trigger abort migration for the virtual network gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayAbortMigration.json
 */
async function virtualNetworkGatewayAbortMigration(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginInvokeAbortMigrationAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayAbortMigration();
}

main().catch(console.error);
