// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about the private store
 *
 * @summary get information about the private store
 * x-ms-original-file: 2025-01-01/GetPrivateStore.json
 */
async function getPrivateStore() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.get("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
  console.log(result);
}

async function main() {
  await getPrivateStore();
}

main().catch(console.error);
