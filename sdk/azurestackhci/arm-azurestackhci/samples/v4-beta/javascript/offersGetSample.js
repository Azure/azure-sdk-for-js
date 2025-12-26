// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Offer resource details within a publisher of HCI Cluster.
 *
 * @summary get Offer resource details within a publisher of HCI Cluster.
 * x-ms-original-file: 2025-12-01-preview/GetOffer.json
 */
async function getOffer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.offers.get("test-rg", "myCluster", "publisher1", "offer1");
  console.log(result);
}

async function main() {
  await getOffer();
}

main().catch(console.error);
