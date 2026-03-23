// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Bookshelf
 *
 * @summary update a Bookshelf
 * x-ms-original-file: 2026-02-01-preview/Bookshelves_Update_MaximumSet_Gen.json
 */
async function bookshelvesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelves.update("rgdiscovery", "c6189a7b33260c4a72", {
    properties: {
      keyVaultProperties: { keyName: "b", keyVersion: "kyf" },
      publicNetworkAccess: "Enabled",
    },
    tags: { key1792: "dnybouectwzjb" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelvesUpdateMaximumSet();
}

main().catch(console.error);
