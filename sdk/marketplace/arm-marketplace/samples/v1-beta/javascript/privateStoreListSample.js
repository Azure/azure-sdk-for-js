// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of available private stores.
 *
 * @summary gets the list of available private stores.
 * x-ms-original-file: 2025-01-01/GetPrivateStores.json
 */
async function getPrivateStores() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const resArray = new Array();
  for await (const item of client.privateStore.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getPrivateStores();
}

main().catch(console.error);
