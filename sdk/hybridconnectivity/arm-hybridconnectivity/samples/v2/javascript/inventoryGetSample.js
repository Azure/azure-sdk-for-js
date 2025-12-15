// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a InventoryResource
 *
 * @summary get a InventoryResource
 * x-ms-original-file: 2024-12-01/Inventory_Get.json
 */
async function inventoryGet() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.inventory.get("ymuj", "zarfsraogroxlaqjjnwixtn", "xofprmcboosrbd");
  console.log(result);
}

async function main() {
  await inventoryGet();
}

main().catch(console.error);
