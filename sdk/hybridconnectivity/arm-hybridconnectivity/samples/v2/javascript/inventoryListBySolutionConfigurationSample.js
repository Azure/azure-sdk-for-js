// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InventoryResource resources by SolutionConfiguration
 *
 * @summary list InventoryResource resources by SolutionConfiguration
 * x-ms-original-file: 2024-12-01/Inventory_ListBySolutionConfiguration.json
 */
async function inventoryListBySolutionConfiguration() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.inventory.listBySolutionConfiguration("ymuj", "wsxt")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await inventoryListBySolutionConfiguration();
}

main().catch(console.error);
