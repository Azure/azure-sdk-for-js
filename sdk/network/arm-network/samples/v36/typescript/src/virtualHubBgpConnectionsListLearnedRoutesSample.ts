// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves a list of routes the virtual hub bgp connection has learned.
 *
 * @summary Retrieves a list of routes the virtual hub bgp connection has learned.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualRouterPeerListLearnedRoute.json
 */
async function virtualRouterPeerListLearnedRoutes(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const hubName = "virtualRouter1";
  const connectionName = "peer1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualHubBgpConnections.beginListLearnedRoutesAndWait(
      resourceGroupName,
      hubName,
      connectionName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualRouterPeerListLearnedRoutes();
}

main().catch(console.error);
