// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualNetworkSubnetUsageParameter} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the virtual network subnet usage for a given virtual network.
 *
 * @summary Lists the virtual network subnet usage for a given virtual network.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/VirtualNetworkSubnetUsageList.json
 */
async function listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const parameters: VirtualNetworkSubnetUsageParameter = {
    virtualNetworkArmResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.virtualNetworkSubnetUsage.list(
    locationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork();
}

main().catch(console.error);
