// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all private store rules in the given private store and collection
 *
 * @summary get a list of all private store rules in the given private store and collection
 * x-ms-original-file: 2025-01-01/GetCollectionRules.json
 */
async function getCollectionRules() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.queryRules(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
  );
  console.log(result);
}

async function main() {
  await getCollectionRules();
}

main().catch(console.error);
