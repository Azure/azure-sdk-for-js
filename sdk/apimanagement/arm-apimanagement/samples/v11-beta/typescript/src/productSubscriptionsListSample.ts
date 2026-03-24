// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the collection of subscriptions to the specified product.
 *
 * @summary lists the collection of subscriptions to the specified product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListProductSubscriptions.json
 */
async function apiManagementListProductSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productSubscriptions.list(
    "rg1",
    "apimService1",
    "5600b57e7e8880006a060002",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListProductSubscriptions();
}

main().catch(console.error);
