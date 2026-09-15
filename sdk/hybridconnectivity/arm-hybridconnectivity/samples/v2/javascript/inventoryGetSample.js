// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a InventoryResource
 *
 * @summary get a InventoryResource
 * x-ms-original-file: 2027-01-01/Inventory_Get_MaximumSet_Gen.json
 */
async function inventoryGetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.inventory.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "abc",
    "pr",
  );
  console.log(result);
}

async function main() {
  await inventoryGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
