// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private link resource for the bookshelf.
 *
 * @summary gets the specified private link resource for the bookshelf.
 * x-ms-original-file: 2026-06-01/BookshelfPrivateLinkResources_Get_MaximumSet_Gen.json
 */
async function bookshelfPrivateLinkResourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelfPrivateLinkResources.get(
    "rgdiscovery",
    "28b448d6fa86171ee3",
    "connection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelfPrivateLinkResourcesGetMaximumSet();
}

main().catch(console.error);
