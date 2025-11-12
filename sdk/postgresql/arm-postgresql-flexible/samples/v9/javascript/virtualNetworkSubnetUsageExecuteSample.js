// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get virtual network subnet usage for a given vNet resource id.
 *
 * @summary Get virtual network subnet usage for a given vNet resource id.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/VirtualNetworkSubnetUsage.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function virtualNetworkSubnetUsageList() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "westus";
  const parameters = {
    virtualNetworkArmResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/testvnet",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualNetworkSubnetUsage.execute(locationName, parameters);
  console.log(result);
}

async function main() {
  await virtualNetworkSubnetUsageList();
}

main().catch(console.error);
