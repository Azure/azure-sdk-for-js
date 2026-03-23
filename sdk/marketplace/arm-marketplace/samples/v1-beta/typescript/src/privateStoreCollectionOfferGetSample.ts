// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a specific offer.
 *
 * @summary gets information about a specific offer.
 * x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOffer.json
 */
async function getPrivateStoreCollectionOffer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollectionOffer.get(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    "marketplacetestthirdparty.md-test-third-party-2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateStoreCollectionOffer();
}

main().catch(console.error);
