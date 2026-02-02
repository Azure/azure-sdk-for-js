// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeMarketplaceClient } from "@azure/arm-edgemarketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Offer resources by subscription ID
 *
 * @summary list Offer resources by subscription ID
 * x-ms-original-file: 2025-10-01-preview/ListOffersBySubscription.json
 */
async function offersListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4bed37fd-19a1-4d31-8b44-40267555bec5";
  const client = new EdgeMarketplaceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.offers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await offersListBySubscription();
}

main().catch(console.error);
