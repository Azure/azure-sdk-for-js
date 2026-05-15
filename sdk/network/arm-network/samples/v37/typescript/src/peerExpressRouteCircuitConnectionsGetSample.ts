// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
 *
 * @summary gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
 * x-ms-original-file: 2025-05-01/PeerExpressRouteCircuitConnectionGet.json
 */
async function peerExpressRouteCircuitConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.peerExpressRouteCircuitConnections.get(
    "rg1",
    "ExpressRouteARMCircuitA",
    "AzurePrivatePeering",
    "60aee347-e889-4a42-8c1b-0aae8b1e4013",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await peerExpressRouteCircuitConnectionGet();
}

main().catch(console.error);
