// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the Azure Web Categories in a subscription.
 *
 * @summary Gets all the Azure Web Categories in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureWebCategoriesListBySubscription.json
 */
async function listAllAzureWebCategoriesForAGivenSubscription() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "4de8428a-4a92-4cea-90ff-b47128b8cab8";
  const credential = new DefaultAzureCredential();
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
