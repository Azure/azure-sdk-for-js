// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a peering in the specified express route circuits.
 *
 * @summary creates or updates a peering in the specified express route circuits.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitPeeringCreate.json
 */
async function createExpressRouteCircuitPeerings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitPeerings.createOrUpdate(
    "rg1",
    "circuitName",
    "AzurePrivatePeering",
    {
      peerASN: 200,
      primaryPeerAddressPrefix: "192.168.16.252/30",
      secondaryPeerAddressPrefix: "192.168.18.252/30",
      vlanId: 200,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createExpressRouteCircuitPeerings();
}

main().catch(console.error);
