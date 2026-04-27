// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update private store collection
 *
 * @summary create or update private store collection
 * x-ms-original-file: 2025-01-01/CreatePrivateStoreCollection.json
 */
async function createPrivateStoreCollection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollection.createOrUpdate(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "d0f5aa2c-ecc3-4d87-906a-f8c486dcc4f1",
    {
      payload: {
        allSubscriptions: false,
        claim: "",
        collectionName: "Test Collection",
        subscriptionsList: [
          "b340914e-353d-453a-85fb-8f9b65b51f91",
          "f2baa04d-5bfc-461b-b6d8-61b403c9ec48",
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createPrivateStoreCollection();
}

main().catch(console.error);
