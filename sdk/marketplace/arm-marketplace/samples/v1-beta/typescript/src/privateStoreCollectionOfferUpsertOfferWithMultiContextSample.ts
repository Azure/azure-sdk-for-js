// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upsert an offer with multiple context details.
 *
 * @summary upsert an offer with multiple context details.
 * x-ms-original-file: 2025-01-01/UpsertOfferWithMultiContext.json
 */
async function upsertOfferWithMultiContext(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollectionOffer.upsertOfferWithMultiContext(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    "contoso.logger",
    {
      payload: {
        eTag: '"9301f4fd-0000-0100-0000-5e248b350332"',
        offerId: "contoso.logger",
        plansContext: [
          { context: "a5edbe7d-9f73-47fd-834a-0d6142f4c7a1", planIds: ["log4db", "log4file"] },
          { context: "45b604af-19bb-448e-a761-4a6be7374b2f", planIds: ["log4web"] },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertOfferWithMultiContext();
}

main().catch(console.error);
