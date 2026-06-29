// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this method provides the list of available skus for the given subscription, resource group and location.
 *
 * @summary this method provides the list of available skus for the given subscription, resource group and location.
 * x-ms-original-file: 2025-07-01/AvailableSkusPost.json
 */
async function availableSkusPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.service.listAvailableSkusByResourceGroup(
    "YourResourceGroupName",
    "westus",
    { country: "XX", location: "westus", transferType: "ImportToAzure" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await availableSkusPost();
}

main().catch(console.error);
