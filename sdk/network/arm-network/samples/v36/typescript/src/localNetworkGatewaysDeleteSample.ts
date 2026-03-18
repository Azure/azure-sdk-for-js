// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified local network gateway.
 *
 * @summary Deletes the specified local network gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LocalNetworkGatewayDelete.json
 */
async function deleteLocalNetworkGateway(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const localNetworkGatewayName = "localgw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.localNetworkGateways.beginDeleteAndWait(
    resourceGroupName,
    localNetworkGatewayName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteLocalNetworkGateway();
}

main().catch(console.error);
