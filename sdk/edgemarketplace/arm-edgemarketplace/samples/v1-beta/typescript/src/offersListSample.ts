// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeMarketplaceClient } from "@azure/arm-edgemarketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Offer resources by parent
 *
 * @summary list Offer resources by parent
 * x-ms-original-file: 2025-10-01-preview/ListOffers.json
 */
async function offersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EdgeMarketplaceClient(credential);
  const resArray = new Array();
  for await (const item of client.offers.list(
    "subscriptions/4bed37fd-19a1-4d31-8b44-40267555bec5/resourceGroups/edgemarketplace-rg/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/edgemarketplace-demo",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await offersList();
}

main().catch(console.error);
