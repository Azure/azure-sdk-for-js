// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a connection to Network Virtual Appliance, if it doesn't exist else updates the existing NVA connection'
 *
 * @summary creates a connection to Network Virtual Appliance, if it doesn't exist else updates the existing NVA connection'
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceConnectionPut.json
 */
async function networkVirtualApplianceConnectionPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualApplianceConnections.createOrUpdate(
    "rg1",
    "nva1",
    "connection1",
    {
      namePropertiesName: "connection1",
      asn: 64512,
      bgpPeerAddress: ["169.254.16.13", "169.254.16.14"],
      enableInternetSecurity: false,
      routingConfiguration: {
        associatedRouteTable: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
        },
        inboundRouteMap: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap1",
        },
        outboundRouteMap: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap2",
        },
        propagatedRouteTables: {
          ids: [
            {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
            },
          ],
          labels: ["label1"],
        },
      },
      tunnelIdentifier: 0,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkVirtualApplianceConnectionPut();
}

main().catch(console.error);
