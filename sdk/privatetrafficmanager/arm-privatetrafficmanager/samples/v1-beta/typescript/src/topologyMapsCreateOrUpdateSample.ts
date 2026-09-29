// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Topology Map.
 *
 * @summary create or update a Topology Map.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_CreateOrUpdate_MaximumSet_Gen.json
 */
async function topologyMapsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.topologyMaps.createOrUpdate(
    "rgprivateTrafficManager",
    "myTopologyMap",
    {
      properties: {
        sites: [
          {
            name: "mySite",
            properties: {
              probingGatewayIds: [
                "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/probingGateways/myProbingGateway",
              ],
              virtualNetworkIds: [
                "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/virtualNetworks/myVirtualNetwork",
              ],
            },
          },
        ],
        catchAllSiteName: "mySite",
      },
      tags: { environment: "production" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topologyMapsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
