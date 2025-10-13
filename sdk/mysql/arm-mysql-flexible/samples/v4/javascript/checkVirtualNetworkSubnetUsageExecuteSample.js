// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get virtual network subnet usage for a given vNet resource id.
 *
 * @summary get virtual network subnet usage for a given vNet resource id.
 * x-ms-original-file: 2024-12-30/CheckVirtualNetworkSubnetUsage.json
 */
async function checkVirtualNetworkSubnetUsage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.checkVirtualNetworkSubnetUsage.execute("WestUS", {
    virtualNetworkResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/testvnet",
  });
  console.log(result);
}

async function main() {
  await checkVirtualNetworkSubnetUsage();
}

main().catch(console.error);
