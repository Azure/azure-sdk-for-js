// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the virtual network subnet usage for a given virtual network.
 *
 * @summary lists the virtual network subnet usage for a given virtual network.
 * x-ms-original-file: 2026-01-01-preview/VirtualNetworkSubnetUsageList.json
 */
async function listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualNetworkSubnetUsage.list("eastus", {
    virtualNetworkArmResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork();
}

main().catch(console.error);
