// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Trigger prepare migration for the virtual network gateway.
 *
 * @summary Trigger prepare migration for the virtual network gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkGatewayPrepareMigration.json
 */

import type {
  VirtualNetworkGatewayMigrationParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualNetworkGatewayPrepareMigration(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const migrationParams: VirtualNetworkGatewayMigrationParameters = {
    migrationType: "UpgradeDeploymentToStandardIP",
    resourceUrl: "testUrl",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginInvokePrepareMigrationAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      migrationParams,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayPrepareMigration();
}

main().catch(console.error);
