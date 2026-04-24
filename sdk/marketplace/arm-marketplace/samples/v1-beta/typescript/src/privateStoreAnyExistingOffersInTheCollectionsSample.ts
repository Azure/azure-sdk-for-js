// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to query whether exists any offer in the collections.
 *
 * @summary query whether exists any offer in the collections.
 * x-ms-original-file: 2025-01-01/AnyExistingOffersInTheCollections.json
 */
async function anyExistingOffersInTheCollections(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.anyExistingOffersInTheCollections(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await anyExistingOffersInTheCollections();
}

main().catch(console.error);
