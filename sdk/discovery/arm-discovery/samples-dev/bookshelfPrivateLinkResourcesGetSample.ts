// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private link resource for the bookshelf.
 *
 * @summary gets the specified private link resource for the bookshelf.
 * x-ms-original-file: 2026-02-01-preview/BookshelfPrivateLinkResources_Get_MaximumSet_Gen.json
 */
async function bookshelfPrivateLinkResourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelfPrivateLinkResources.get(
    "rgdiscovery",
    "9158657d63f4f9235f",
    "connection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelfPrivateLinkResourcesGetMaximumSet();
}

main().catch(console.error);
