// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration.
 *
 * @summary list all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration.
 * x-ms-original-file: 2025-05-01/AllVirtualNetworkGatewayRadiusServerSecretsList.json
 */
async function listAllVirtualNetworkGatewayRadiusServerSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.listRadiusSecrets("rg1", "vpngw");
  console.log(result);
}

async function main(): Promise<void> {
  await listAllVirtualNetworkGatewayRadiusServerSecrets();
}

main().catch(console.error);
