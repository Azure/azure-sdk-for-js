// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Bookshelf
 *
 * @summary get a Bookshelf
 * x-ms-original-file: 2026-06-01/Bookshelves_Get_MaximumSet_Gen.json
 */
async function bookshelvesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelves.get("rgdiscovery", "cfa586c95413ca2f8a");
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelvesGetMaximumSet();
}

main().catch(console.error);
