// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Offers available across publishers for the HCI Cluster.
 *
 * @summary list Offers available across publishers for the HCI Cluster.
 * x-ms-original-file: 2026-02-01/ListOffersByCluster.json
 */
async function listOfferResourcesByHCICluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.offers.listByCluster("test-rg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOfferResourcesByHCICluster();
}

main().catch(console.error);
