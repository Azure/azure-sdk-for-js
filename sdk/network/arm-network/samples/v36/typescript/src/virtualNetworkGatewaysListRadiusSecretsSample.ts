// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration.
 *
 * @summary List all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AllVirtualNetworkGatewayRadiusServerSecretsList.json
 */
async function listAllVirtualNetworkGatewayRadiusServerSecrets(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "72f988bf-86f1-41af-91ab-2d7cd0dddd4";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.listRadiusSecrets(
    resourceGroupName,
    virtualNetworkGatewayName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAllVirtualNetworkGatewayRadiusServerSecrets();
}

main().catch(console.error);
