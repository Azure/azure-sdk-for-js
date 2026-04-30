// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Bookshelf
 *
 * @summary delete a Bookshelf
 * x-ms-original-file: 2026-02-01-preview/Bookshelves_Delete_MaximumSet_Gen.json
 */
async function bookshelvesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.bookshelves.delete("rgdiscovery", "cdaa070c4d0ea7b9c9");
}

async function main() {
  await bookshelvesDeleteMaximumSet();
}

main().catch(console.error);
