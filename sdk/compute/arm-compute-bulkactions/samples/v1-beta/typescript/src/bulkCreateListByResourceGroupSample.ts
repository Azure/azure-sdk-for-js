// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list BulkCreate resources by resource group.
 *
 * @summary list BulkCreate resources by resource group.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_ListByResourceGroup_MaximumSet_Gen.json
 */
async function bulkCreateListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreate.listByResourceGroup("rgBulkactions", "eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await bulkCreateListByResourceGroupMaximumSet();
}

main().catch(console.error);
