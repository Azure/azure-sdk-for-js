// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list InventoryResource resources by SolutionConfiguration
 *
 * @summary list InventoryResource resources by SolutionConfiguration
 * x-ms-original-file: 2024-12-01/Inventory_ListBySolutionConfiguration.json
 */
async function inventoryListBySolutionConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.inventory.Inventory_listBySolutionConfiguration("ymuj", "wsxt")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await inventoryListBySolutionConfiguration();
}

main().catch(console.error);
