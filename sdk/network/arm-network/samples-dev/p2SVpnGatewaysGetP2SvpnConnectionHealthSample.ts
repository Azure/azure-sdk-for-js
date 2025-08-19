// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/P2SVpnGatewayGetConnectionHealth.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function p2SVpnGatewayGetConnectionHealth(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "p2sVpnGateway1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.p2SVpnGateways.beginGetP2SVpnConnectionHealthAndWait(
      resourceGroupName,
      gatewayName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await p2SVpnGatewayGetConnectionHealth();
}

main().catch(console.error);
