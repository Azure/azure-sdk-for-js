// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualNetworkSubnetUsageParameter } from "@azure/arm-mysql-flexible";
import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get virtual network subnet usage for a given vNet resource id.
 *
 * @summary Get virtual network subnet usage for a given vNet resource id.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/stable/2023-12-30/examples/CheckVirtualNetworkSubnetUsage.json
 */
async function checkVirtualNetworkSubnetUsage(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "WestUS";
  const parameters: VirtualNetworkSubnetUsageParameter = {
    virtualNetworkResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/testvnet",
  };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.checkVirtualNetworkSubnetUsage.execute(locationName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await checkVirtualNetworkSubnetUsage();
}

main().catch(console.error);
