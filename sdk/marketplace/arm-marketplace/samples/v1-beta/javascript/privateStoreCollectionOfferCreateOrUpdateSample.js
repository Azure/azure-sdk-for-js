// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update or add an offer to a specific collection of the private store.
 *
 * @summary update or add an offer to a specific collection of the private store.
 * x-ms-original-file: 2025-01-01/PrivateStoreOffer_update.json
 */
async function privateStoreOfferUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollectionOffer.createOrUpdate(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    "marketplacetestthirdparty.md-test-third-party-2",
    { eTag: '"9301f4fd-0000-0100-0000-5e248b350666"', specificPlanIdsLimitation: ["0001", "0002"] },
  );
  console.log(result);
}

async function main() {
  await privateStoreOfferUpdate();
}

main().catch(console.error);
