// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a network profile.
 *
 * @summary Creates or updates a network profile.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkProfileCreateConfigOnly.json
 */
async function createNetworkProfileDefaults() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkProfileName = "networkProfile1";
  const parameters = {
    containerNetworkInterfaceConfigurations: [
      {
        name: "eth1",
        ipConfigurations: [
          {
            name: "ipconfig1",
            subnet: {
              id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/networkProfileVnet/subnets/networkProfileSubnet1",
            },
          },
        ],
      },
    ],
    location: "westus",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkProfiles.createOrUpdate(
    resourceGroupName,
    networkProfileName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createNetworkProfileDefaults();
}

main().catch(console.error);
