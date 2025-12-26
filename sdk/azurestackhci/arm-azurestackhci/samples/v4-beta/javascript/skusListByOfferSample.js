// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Skus available for a offer within the HCI Cluster.
 *
 * @summary list Skus available for a offer within the HCI Cluster.
 * x-ms-original-file: 2025-12-01-preview/ListSkusByOffer.json
 */
async function listSKUResourcesByOfferForTheHCICluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.listByOffer(
    "test-rg",
    "myCluster",
    "publisher1",
    "offer1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSKUResourcesByOfferForTheHCICluster();
}

main().catch(console.error);
