// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
 *
 * @summary retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
 * x-ms-original-file: 2025-05-01/VirtualRouterPeerListAdvertisedRoute.json
 */
async function virtualRouterPeerListAdvertisedRoutes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubBgpConnections.listAdvertisedRoutes(
    "rg1",
    "virtualRouter1",
    "peer1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualRouterPeerListAdvertisedRoutes();
}

main().catch(console.error);
