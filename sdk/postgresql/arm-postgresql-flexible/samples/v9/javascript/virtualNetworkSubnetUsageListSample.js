// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the virtual network subnet usage for a given virtual network.
 *
 * @summary Lists the virtual network subnet usage for a given virtual network.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/VirtualNetworkSubnetUsageList.json
 */
async function listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const parameters = {
    virtualNetworkArmResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualNetworkSubnetUsage.list(locationName, parameters);
  console.log(result);
}

async function main() {
  await listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork();
}

main().catch(console.error);
