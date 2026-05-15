// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Express Route Circuit Connection in the specified express route circuits.
 *
 * @summary creates or updates a Express Route Circuit Connection in the specified express route circuits.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitConnectionCreate.json
 */
async function expressRouteCircuitConnectionCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitConnections.createOrUpdate(
    "rg1",
    "ExpressRouteARMCircuitA",
    "AzurePrivatePeering",
    "circuitConnectionUSAUS",
    {
      addressPrefix: "10.0.0.0/29",
      authorizationKey: "946a1918-b7a2-4917-b43c-8c4cdaee006a",
      expressRouteCircuitPeering: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/dedharcktinit/providers/Microsoft.Network/expressRouteCircuits/dedharcktlocal/peerings/AzurePrivatePeering",
      },
      ipv6CircuitConnectionConfig: { addressPrefix: "aa:bb::/125" },
      peerExpressRouteCircuitPeering: {
        id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/dedharcktpeer/providers/Microsoft.Network/expressRouteCircuits/dedharcktremote/peerings/AzurePrivatePeering",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteCircuitConnectionCreate();
}

main().catch(console.error);
