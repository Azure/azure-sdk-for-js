// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the Azure Web Categories in a subscription.
 *
 * @summary gets all the Azure Web Categories in a subscription.
 * x-ms-original-file: 2025-05-01/AzureWebCategoriesListBySubscription.json
 */
async function listAllAzureWebCategoriesForAGivenSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4de8428a-4a92-4cea-90ff-b47128b8cab8";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webCategories.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllAzureWebCategoriesForAGivenSubscription();
}

main().catch(console.error);
