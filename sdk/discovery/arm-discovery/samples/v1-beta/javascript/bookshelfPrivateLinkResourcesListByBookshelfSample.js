// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private link resources for the bookshelf.
 *
 * @summary lists all private link resources for the bookshelf.
 * x-ms-original-file: 2026-02-01-preview/BookshelfPrivateLinkResources_ListByBookshelf_MaximumSet_Gen.json
 */
async function bookshelfPrivateLinkResourcesListByBookshelfMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bookshelfPrivateLinkResources.listByBookshelf(
    "rgdiscovery",
    "cb4a7b7d5c4b6c3f78",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bookshelfPrivateLinkResourcesListByBookshelfMaximumSet();
}

main().catch(console.error);
