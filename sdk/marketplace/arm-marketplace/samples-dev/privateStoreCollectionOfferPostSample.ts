// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Private store offer. This is a workaround.
 *
 * @summary delete Private store offer. This is a workaround.
 * x-ms-original-file: 2025-01-01/PostPrivateStoreCollectionOffer.json
 */
async function postPrivateStoreCollectionOffer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStoreCollectionOffer.post(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    "marketplacetestthirdparty.md-test-third-party-2",
  );
}

async function main(): Promise<void> {
  await postPrivateStoreCollectionOffer();
}

main().catch(console.error);
