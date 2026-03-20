// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to transferring offers (copy or move) from source collection to target collection(s)
 *
 * @summary transferring offers (copy or move) from source collection to target collection(s)
 * x-ms-original-file: 2025-01-01/TransferOffers.json
 */
async function transferOffers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollection.transferOffers(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    {
      payload: {
        offerIdsList: [
          "marketplacetestthirdparty.md-test-third-party-2",
          "marketplacetestthirdparty.md-test-third-party-3",
        ],
        operation: "copy",
        targetCollections: [
          "c752f021-1c37-4af5-b82f-74c51c27b44a",
          "f47ef1c7-e908-4f39-ae29-db181634ad8d",
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await transferOffers();
}

main().catch(console.error);
