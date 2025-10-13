// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get virtual network subnet usage for a given vNet resource id.
 *
 * @summary get virtual network subnet usage for a given vNet resource id.
 * x-ms-original-file: 2024-12-30/CheckVirtualNetworkSubnetUsage.json
 */
async function checkVirtualNetworkSubnetUsage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.checkVirtualNetworkSubnetUsage.execute("WestUS", {
    virtualNetworkResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/testvnet",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkVirtualNetworkSubnetUsage();
}

main().catch(console.error);
