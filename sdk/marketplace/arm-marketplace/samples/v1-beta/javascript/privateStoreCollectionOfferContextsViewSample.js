// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve offer information with plans under required contexts restrictions.
 *
 * @summary retrieve offer information with plans under required contexts restrictions.
 * x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOfferContextsView.json
 */
async function getPrivateStoreCollectionOfferContextsView() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollectionOffer.contextsView(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    "mktp3pp.kuku-buku",
    {
      payload: {
        subscriptionIds: [
          "b340914e-353d-453a-85fb-8f9b65b51f91",
          "f2baa04d-5bfc-461b-b6d8-61b403c9ec48",
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await getPrivateStoreCollectionOfferContextsView();
}

main().catch(console.error);
