// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of offers, regardless the collections
 *
 * @summary list of offers, regardless the collections
 * x-ms-original-file: 2025-01-01/QueryOffers.json
 */
async function queryOffers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.queryOffers("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
  console.log(result);
}

async function main(): Promise<void> {
  await queryOffers();
}

main().catch(console.error);
