// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all private offers in the given private store and collection
 *
 * @summary get a list of all private offers in the given private store and collection
 * x-ms-original-file: 2025-01-01/GetPrivateStoreOffers.json
 */
async function getPrivateStoreOffers() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const resArray = new Array();
  for await (const item of client.privateStoreCollectionOffer.list(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getPrivateStoreOffers();
}

main().catch(console.error);
