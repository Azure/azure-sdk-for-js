// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a InventoryResource
 *
 * @summary get a InventoryResource
 * x-ms-original-file: 2024-12-01/Inventory_Get.json
 */
async function inventoryGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.inventory.Inventory_get(
    "ymuj",
    "zarfsraogroxlaqjjnwixtn",
    "xofprmcboosrbd",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await inventoryGet();
}

main().catch(console.error);
