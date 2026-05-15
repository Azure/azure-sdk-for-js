// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2.
 *
 * @summary creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2.
 * x-ms-original-file: 2025-05-01/VirtualHubRouteTableV2Put.json
 */
async function virtualHubRouteTableV2Put() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubRouteTableV2S.createOrUpdate(
    "rg1",
    "virtualHub1",
    "virtualHubRouteTable1a",
    {
      attachedConnections: ["All_Vnets"],
      routes: [
        {
          destinationType: "CIDR",
          destinations: ["20.10.0.0/16", "20.20.0.0/16"],
          nextHopType: "IPAddress",
          nextHops: ["10.0.0.68"],
        },
        {
          destinationType: "CIDR",
          destinations: ["0.0.0.0/0"],
          nextHopType: "IPAddress",
          nextHops: ["10.0.0.68"],
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await virtualHubRouteTableV2Put();
}

main().catch(console.error);
