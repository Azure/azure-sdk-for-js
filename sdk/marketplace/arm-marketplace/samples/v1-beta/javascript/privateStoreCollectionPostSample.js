// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Private store collection. This is a workaround.
 *
 * @summary delete Private store collection. This is a workaround.
 * x-ms-original-file: 2025-01-01/PostPrivateStoreCollection.json
 */
async function postPrivateStoreCollection() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStoreCollection.post(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
  );
}

async function main() {
  await postPrivateStoreCollection();
}

main().catch(console.error);
