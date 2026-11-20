// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list BulkCreateCustom resources by resource group.
 *
 * @summary list BulkCreateCustom resources by resource group.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_ListByResourceGroup.json
 */
async function listBulkCreateCustomOperationsInAResourceGroupAndRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreateCustom.listByResourceGroup(
    "rg-bulk-create",
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBulkCreateCustomOperationsInAResourceGroupAndRegion();
}

main().catch(console.error);
