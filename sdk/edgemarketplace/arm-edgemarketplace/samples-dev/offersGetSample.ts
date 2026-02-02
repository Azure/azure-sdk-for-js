// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeMarketplaceClient } from "@azure/arm-edgemarketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Offer
 *
 * @summary get a Offer
 * x-ms-original-file: 2025-10-01-preview/GetOffer.json
 */
async function offersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EdgeMarketplaceClient(credential);
  const result = await client.offers.get(
    "subscriptions/4bed37fd-19a1-4d31-8b44-40267555bec5/resourceGroups/edgemarketplace-rg/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/edgemarketplace-demo",
    "0001-com-ubuntu-pro-jammy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await offersGet();
}

main().catch(console.error);
