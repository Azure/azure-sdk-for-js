// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all offers in the given collection according to the required contexts.
 *
 * @summary get a list of all offers in the given collection according to the required contexts.
 * x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOffersWithFullContext.json
 */
async function getPrivateStoreCollectionOffersWithFullContext(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const resArray = new Array();
  for await (const item of client.privateStoreCollectionOffer.listByContexts(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    {
      payload: {
        subscriptionIds: [
          "b340914e-353d-453a-85fb-8f9b65b51f91",
          "f2baa04d-5bfc-461b-b6d8-61b403c9ec48",
        ],
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateStoreCollectionOffersWithFullContext();
}

main().catch(console.error);
