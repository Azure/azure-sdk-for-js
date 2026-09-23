// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Bookshelf
 *
 * @summary delete a Bookshelf
 * x-ms-original-file: 2026-06-01/Bookshelves_Delete_MaximumSet_Gen.json
 */
async function bookshelvesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.bookshelves.delete("rgdiscovery", "507b19b0687a8924a5");
}

async function main(): Promise<void> {
  await bookshelvesDeleteMaximumSet();
}

main().catch(console.error);
