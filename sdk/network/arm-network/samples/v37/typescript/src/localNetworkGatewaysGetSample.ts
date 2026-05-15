// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified local network gateway in a resource group.
 *
 * @summary gets the specified local network gateway in a resource group.
 * x-ms-original-file: 2025-05-01/LocalNetworkGatewayGet.json
 */
async function getLocalNetworkGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.localNetworkGateways.get("rg1", "localgw");
  console.log(result);
}

async function main(): Promise<void> {
  await getLocalNetworkGateway();
}

main().catch(console.error);
