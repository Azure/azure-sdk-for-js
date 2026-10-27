// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InventoryResource resources by SolutionConfiguration
 *
 * @summary list InventoryResource resources by SolutionConfiguration
 * x-ms-original-file: 2027-01-01/Inventory_ListBySolutionConfiguration_MaximumSet_Gen.json
 */
async function inventoryListBySolutionConfigurationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.inventory.listBySolutionConfiguration(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "abc",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await inventoryListBySolutionConfigurationGeneratedByMaximumSetRule();
}

main().catch(console.error);
