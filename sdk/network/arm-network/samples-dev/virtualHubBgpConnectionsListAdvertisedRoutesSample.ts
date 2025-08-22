// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
 *
 * @summary Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualRouterPeerListAdvertisedRoute.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualRouterPeerListAdvertisedRoutes(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const hubName = "virtualRouter1";
  const connectionName = "peer1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualHubBgpConnections.beginListAdvertisedRoutesAndWait(
      resourceGroupName,
      hubName,
      connectionName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualRouterPeerListAdvertisedRoutes();
}

main().catch(console.error);
