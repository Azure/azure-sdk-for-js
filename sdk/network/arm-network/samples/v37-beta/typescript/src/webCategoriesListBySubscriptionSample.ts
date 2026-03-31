// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the Azure Web Categories in a subscription.
 *
 * @summary gets all the Azure Web Categories in a subscription.
 * x-ms-original-file: 2025-05-01/AzureWebCategoriesListBySubscription.json
 */
async function listAllAzureWebCategoriesForAGivenSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4de8428a-4a92-4cea-90ff-b47128b8cab8";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webCategories.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllAzureWebCategoriesForAGivenSubscription();
}

main().catch(console.error);
