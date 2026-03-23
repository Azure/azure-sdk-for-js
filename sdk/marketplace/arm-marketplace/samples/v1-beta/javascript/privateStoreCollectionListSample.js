// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets private store collections list
 *
 * @summary gets private store collections list
 * x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionsList.json
 */
async function getPrivateStoreCollectionsList() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollection.list("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
  console.log(result);
}

async function main() {
  await getPrivateStoreCollectionsList();
}

main().catch(console.error);
