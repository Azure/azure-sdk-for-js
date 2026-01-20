// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the virtual network subnet usage for a given virtual network.
 *
 * @summary lists the virtual network subnet usage for a given virtual network.
 * x-ms-original-file: 2026-01-01-preview/VirtualNetworkSubnetUsageList.json
 */
async function listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualNetworkSubnetUsage.list("eastus", {
    virtualNetworkArmResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork",
  });
  console.log(result);
}

async function main() {
  await listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork();
}

main().catch(console.error);
