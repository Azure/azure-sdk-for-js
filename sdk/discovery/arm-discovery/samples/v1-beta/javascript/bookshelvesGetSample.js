// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Bookshelf
 *
 * @summary get a Bookshelf
 * x-ms-original-file: 2026-02-01-preview/Bookshelves_Get_MaximumSet_Gen.json
 */
async function bookshelvesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelves.get("rgdiscovery", "85c2fc6e437c0b608b");
  console.log(result);
}

async function main() {
  await bookshelvesGetMaximumSet();
}

main().catch(console.error);
