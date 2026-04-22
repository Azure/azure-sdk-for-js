// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of user's approved offers for the provided offers and subscriptions
 *
 * @summary list of user's approved offers for the provided offers and subscriptions
 * x-ms-original-file: 2025-01-01/QueryUserOffers.json
 */
async function queryUserOffers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.queryUserOffers("a0e28e55-90c4-41d8-8e34-bb7ef7775406", {
    payload: {
      offerIds: ["contoso.logger", "contoso.monitor"],
      subscriptionIds: ["b340914e-353d-453a-85fb-8f9b65b51f91"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await queryUserOffers();
}

main().catch(console.error);
