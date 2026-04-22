// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a collection from the given private store.
 *
 * @summary delete a collection from the given private store.
 * x-ms-original-file: 2025-01-01/DeletePrivateStoreCollection.json
 */
async function deletePrivateStoreCollection() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStoreCollection.delete(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "d0f5aa2c-ecc3-4d87-906a-f8c486dcc4f1",
  );
}

async function main() {
  await deletePrivateStoreCollection();
}

main().catch(console.error);
