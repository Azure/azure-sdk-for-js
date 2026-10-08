// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Topology Map.
 *
 * @summary create or update a Topology Map.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_CreateOrUpdate_MaximumSet_Gen.json
 */
async function topologyMapsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
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

async function main() {
  await topologyMapsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
