// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network profile.
 *
 * @summary creates or updates a network profile.
 * x-ms-original-file: 2025-05-01/NetworkProfileCreateConfigOnly.json
 */
async function createNetworkProfileDefaults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkProfiles.createOrUpdate("rg1", "networkProfile1", {
    location: "westus",
    containerNetworkInterfaceConfigurations: [
      {
        name: "eth1",
        ipConfigurations: [
          {
            name: "ipconfig1",
            subnet: {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/networkProfileVnet/subnets/networkProfileSubnet1",
            },
          },
        ],
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createNetworkProfileDefaults();
}

main().catch(console.error);
