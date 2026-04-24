// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to for a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list.
 *
 * @summary for a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list.
 * x-ms-original-file: 2025-01-01/CollectionsToSubscriptionsMapping.json
 */
async function collectionsToSubscriptionsMapping() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.collectionsToSubscriptionsMapping(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    {
      payload: {
        properties: {
          subscriptionIds: [
            "b340914e-353d-453a-85fb-8f9b65b51f91",
            "f2baa04d-5bfc-461b-b6d8-61b403c9ec48",
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await collectionsToSubscriptionsMapping();
}

main().catch(console.error);
