// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Offers available for a publisher within the HCI Cluster.
 *
 * @summary list Offers available for a publisher within the HCI Cluster.
 * x-ms-original-file: 2025-12-01-preview/ListOffersByPublisher.json
 */
async function listOfferResourcesByPublisherForTheHCICluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.offers.listByPublisher("test-rg", "myCluster", "publisher1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfferResourcesByPublisherForTheHCICluster();
}

main().catch(console.error);
