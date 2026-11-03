// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all private link resources for the bookshelf.
 *
 * @summary lists all private link resources for the bookshelf.
 * x-ms-original-file: 2026-06-01/BookshelfPrivateLinkResources_ListByBookshelf_MaximumSet_Gen.json
 */
async function bookshelfPrivateLinkResourcesListByBookshelfMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bookshelfPrivateLinkResources.listByBookshelf(
    "rgdiscovery",
    "4ee70172cf125c4793",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await bookshelfPrivateLinkResourcesListByBookshelfMaximumSet();
}

main().catch(console.error);
